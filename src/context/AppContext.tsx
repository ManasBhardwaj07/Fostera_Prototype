import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import type { ReactNode } from 'react';
import type {
  UserProfile,
  AppUsage,
  AppLimit,
  FocusSession,
  FocusPurpose,
  ScheduleRule,
  ReductionPlan,
  UserReward,
  DailyProgress,
  Insight,
  Nudge,
  NavigationTab,
  UsageZone,
} from '../types';
import { calculateUsageZone } from '../domain/usage/zoneCalculator';
import { generateDeterministicInsights, generateDeterministicNudges } from '../domain/insights/insightEngine';
import {
  storageService,
  DEFAULT_USER_PROFILE,
  DEFAULT_APP_LIMITS,
  DEFAULT_SCHEDULE_RULES,
  DEFAULT_REDUCTION_PLAN,
  DEFAULT_USER_REWARD,
} from '../services/persistence/storageService';
import { usageDataProvider } from '../services/usage/UsageDataProvider';

interface AppContextType {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  profile: UserProfile;
  updateDailyGoal: (minutes: number) => void;
  completeOnboarding: (goalMinutes: number, distractions: string[]) => void;
  restartOnboarding: () => void;
  apps: AppUsage[];
  totalUsageMinutes: number;
  currentZone: UsageZone;
  weeklyTrend: DailyProgress[];
  goalDiffMinutes: number;
  isOverGoal: boolean;
  limits: Record<string, AppLimit>;
  setAppLimit: (appId: string, limitMinutes: number) => void;
  removeAppLimit: (appId: string) => void;
  activeFocus: FocusSession | null;
  startFocusSession: (durationMinutes: number, selectedAppIds: string[], purpose: FocusPurpose) => void;
  endFocusSession: () => void;
  completeFocusSession: () => void;
  completedSessionData: { durationMinutes: number; appsCount: number; todayFocusTotal: number } | null;
  clearCompletedSessionData: () => void;
  scheduleRules: ScheduleRule[];
  toggleScheduleRule: (id: string) => void;
  addScheduleRule: (rule: Omit<ScheduleRule, 'id'>) => void;
  reductionPlan: ReductionPlan;
  toggleReductionPlan: () => void;
  reward: UserReward;
  insights: Insight[];
  nudges: Nudge[];
  dismissNudge: (id: string) => void;
  selectedAppForDetail: AppUsage | null;
  setSelectedAppForDetail: (app: AppUsage | null) => void;
  selectedAppForLimit: AppUsage | null;
  setSelectedAppForLimit: (app: AppUsage | null) => void;
  isSchedulesModalOpen: boolean;
  setIsSchedulesModalOpen: (open: boolean) => void;
  isReductionModalOpen: boolean;
  setIsReductionModalOpen: (open: boolean) => void;
  isInsightsModalOpen: boolean;
  setIsInsightsModalOpen: (open: boolean) => void;
  isDevModalOpen: boolean;
  setIsDevModalOpen: (open: boolean) => void;
  resetAllDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('TODAY');
  const [profile, setProfile] = useState<UserProfile>(() => storageService.getUserProfile());
  const [apps, setApps] = useState<AppUsage[]>([]);
  const [weeklyTrend, setWeeklyTrend] = useState<DailyProgress[]>([]);
  const [limits, setLimits] = useState<Record<string, AppLimit>>(() => storageService.getAppLimits());
  const [activeFocus, setActiveFocus] = useState<FocusSession | null>(() => storageService.getActiveFocus());
  const [completedSessionData, setCompletedSessionData] = useState<{
    durationMinutes: number;
    appsCount: number;
    todayFocusTotal: number;
  } | null>(null);
  const [scheduleRules, setScheduleRules] = useState<ScheduleRule[]>(() => storageService.getScheduleRules());
  const [reductionPlan, setReductionPlan] = useState<ReductionPlan>(() => storageService.getReductionPlan());
  const [reward, setReward] = useState<UserReward>(() => storageService.getUserReward());
  const [dismissedNudgeIds, setDismissedNudgeIds] = useState<string[]>(() => storageService.getDismissedNudges());

  const [selectedAppForDetail, setSelectedAppForDetail] = useState<AppUsage | null>(null);
  const [selectedAppForLimit, setSelectedAppForLimit] = useState<AppUsage | null>(null);
  const [isSchedulesModalOpen, setIsSchedulesModalOpen] = useState(false);
  const [isReductionModalOpen, setIsReductionModalOpen] = useState(false);
  const [isInsightsModalOpen, setIsInsightsModalOpen] = useState(false);
  const [isDevModalOpen, setIsDevModalOpen] = useState(false);

  useEffect(() => {
    usageDataProvider.getTodayAppUsage().then(setApps);
    usageDataProvider.getWeeklyTrend().then(setWeeklyTrend);
  }, []);

  const totalUsageMinutes = useMemo(() => {
    return apps.reduce((acc, app) => acc + app.usageMinutes, 0);
  }, [apps]);

  const currentZone = useMemo(() => {
    return calculateUsageZone(totalUsageMinutes);
  }, [totalUsageMinutes]);

  const goalDiffMinutes = Math.abs(totalUsageMinutes - profile.dailyGoalMinutes);
  const isOverGoal = totalUsageMinutes > profile.dailyGoalMinutes;

  const rawInsights = useMemo(() => {
    return generateDeterministicInsights(apps, limits, profile.dailyGoalMinutes, totalUsageMinutes);
  }, [apps, limits, profile.dailyGoalMinutes, totalUsageMinutes]);

  const rawNudges = useMemo(() => {
    return generateDeterministicNudges(apps, limits, profile.dailyGoalMinutes, totalUsageMinutes);
  }, [apps, limits, profile.dailyGoalMinutes, totalUsageMinutes]);

  const nudges = useMemo(() => {
    return rawNudges.filter(n => !dismissedNudgeIds.includes(n.id));
  }, [rawNudges, dismissedNudgeIds]);

  const completeFocusSession = useCallback(() => {
    if (!activeFocus) return;

    const duration = activeFocus.durationMinutes;
    const appsCount = activeFocus.selectedAppIds.length;
    const completedSession: FocusSession = {
      ...activeFocus,
      status: 'completed',
      remainingSeconds: 0,
      endedAt: new Date().toISOString(),
    };

    const history = storageService.getFocusHistory();
    storageService.saveFocusHistory([completedSession, ...history]);
    storageService.saveActiveFocus(null);
    setActiveFocus(null);

    setReward(prev => {
      const newTodayFocus = prev.todayFocusMinutes + duration;
      const newCompleted = prev.completedFocusSessions + 1;
      const newStreak = prev.streakDays + 1;

      const updatedBadges = prev.badges.map(badge => {
        if (badge.id === 'badge_first_focus' && !badge.unlocked) {
          return { ...badge, unlocked: true, unlockedAt: new Date().toISOString().split('T')[0] };
        }
        if (badge.id === 'badge_goal_achieved' && !badge.unlocked) {
          return { ...badge, unlocked: true, unlockedAt: new Date().toISOString().split('T')[0] };
        }
        return badge;
      });

      const updatedReward: UserReward = {
        streakDays: newStreak,
        todayFocusMinutes: newTodayFocus,
        weeklyImprovementPercent: prev.weeklyImprovementPercent + 2,
        completedFocusSessions: newCompleted,
        badges: updatedBadges,
      };

      storageService.saveUserReward(updatedReward);
      return updatedReward;
    });

    setCompletedSessionData({
      durationMinutes: duration,
      appsCount,
      todayFocusTotal: reward.todayFocusMinutes + duration,
    });
  }, [activeFocus, reward.todayFocusMinutes]);

  useEffect(() => {
    if (!activeFocus || activeFocus.status !== 'active') return;

    const timer = setInterval(() => {
      setActiveFocus(prev => {
        if (!prev || prev.status !== 'active') return null;
        if (prev.remainingSeconds <= 1) {
          setTimeout(() => completeFocusSession(), 50);
          return { ...prev, remainingSeconds: 0, status: 'completed' };
        }
        const updated = { ...prev, remainingSeconds: prev.remainingSeconds - 1 };
        storageService.saveActiveFocus(updated);
        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeFocus?.status, completeFocusSession]);

  const updateDailyGoal = useCallback((minutes: number) => {
    setProfile(prev => {
      const updated = { ...prev, dailyGoalMinutes: minutes };
      storageService.saveUserProfile(updated);
      return updated;
    });
  }, []);

  const completeOnboarding = useCallback((goalMinutes: number, distractions: string[]) => {
    setProfile(prev => {
      const updated: UserProfile = {
        ...prev,
        dailyGoalMinutes: goalMinutes,
        distractionAppIds: distractions,
        onboardingComplete: true,
      };
      storageService.saveUserProfile(updated);
      return updated;
    });
    setActiveTab('TODAY');
  }, []);

  const restartOnboarding = useCallback(() => {
    setProfile(prev => {
      const updated = { ...prev, onboardingComplete: false };
      storageService.saveUserProfile(updated);
      return updated;
    });
  }, []);

  const setAppLimit = useCallback((appId: string, limitMinutes: number) => {
    setLimits(prev => {
      const updated = {
        ...prev,
        [appId]: {
          appId,
          limitMinutes,
          enabled: true,
        },
      };
      storageService.saveAppLimits(updated);
      return updated;
    });
  }, []);

  const removeAppLimit = useCallback((appId: string) => {
    setLimits(prev => {
      const updated = { ...prev };
      delete updated[appId];
      storageService.saveAppLimits(updated);
      return updated;
    });
  }, []);

  const startFocusSession = useCallback((durationMinutes: number, selectedAppIds: string[], purpose: FocusPurpose) => {
    const session: FocusSession = {
      id: 'focus_' + Date.now(),
      durationMinutes,
      remainingSeconds: durationMinutes * 60,
      selectedAppIds,
      status: 'active',
      startedAt: new Date().toISOString(),
      purpose,
    };
    setActiveFocus(session);
    storageService.saveActiveFocus(session);
  }, []);

  const endFocusSession = useCallback(() => {
    if (activeFocus) {
      const cancelled = { ...activeFocus, status: 'cancelled' as const, endedAt: new Date().toISOString() };
      storageService.saveActiveFocus(null);
      const history = storageService.getFocusHistory();
      storageService.saveFocusHistory([cancelled, ...history]);
    }
    setActiveFocus(null);
  }, [activeFocus]);

  const clearCompletedSessionData = useCallback(() => {
    setCompletedSessionData(null);
  }, []);

  const toggleScheduleRule = useCallback((id: string) => {
    setScheduleRules(prev => {
      const updated = prev.map(r => (r.id === id ? { ...r, enabled: !r.enabled } : r));
      storageService.saveScheduleRules(updated);
      return updated;
    });
  }, []);

  const addScheduleRule = useCallback((newRule: Omit<ScheduleRule, 'id'>) => {
    setScheduleRules(prev => {
      const rule: ScheduleRule = {
        ...newRule,
        id: 'sched_' + Date.now(),
      };
      const updated = [...prev, rule];
      storageService.saveScheduleRules(updated);
      return updated;
    });
  }, []);

  const toggleReductionPlan = useCallback(() => {
    setReductionPlan(prev => {
      const updated = { ...prev, enabled: !prev.enabled };
      storageService.saveReductionPlan(updated);
      return updated;
    });
  }, []);

  const dismissNudge = useCallback((id: string) => {
    setDismissedNudgeIds(prev => {
      const updated = [...prev, id];
      storageService.saveDismissedNudges(updated);
      return updated;
    });
  }, []);

  const resetAllDemoData = useCallback(() => {
    storageService.resetAll();
    setProfile(DEFAULT_USER_PROFILE);
    setLimits(DEFAULT_APP_LIMITS);
    setActiveFocus(null);
    setScheduleRules(DEFAULT_SCHEDULE_RULES);
    setReductionPlan(DEFAULT_REDUCTION_PLAN);
    setReward(DEFAULT_USER_REWARD);
    setDismissedNudgeIds([]);
    setSelectedAppForDetail(null);
    setSelectedAppForLimit(null);
    setCompletedSessionData(null);
    setActiveTab('TODAY');
    usageDataProvider.getTodayAppUsage().then(setApps);
  }, []);

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        profile,
        updateDailyGoal,
        completeOnboarding,
        restartOnboarding,
        apps,
        totalUsageMinutes,
        currentZone,
        weeklyTrend,
        goalDiffMinutes,
        isOverGoal,
        limits,
        setAppLimit,
        removeAppLimit,
        activeFocus,
        startFocusSession,
        endFocusSession,
        completeFocusSession,
        completedSessionData,
        clearCompletedSessionData,
        scheduleRules,
        toggleScheduleRule,
        addScheduleRule,
        reductionPlan,
        toggleReductionPlan,
        reward,
        insights: rawInsights,
        nudges,
        dismissNudge,
        selectedAppForDetail,
        setSelectedAppForDetail,
        selectedAppForLimit,
        setSelectedAppForLimit,
        isSchedulesModalOpen,
        setIsSchedulesModalOpen,
        isReductionModalOpen,
        setIsReductionModalOpen,
        isInsightsModalOpen,
        setIsInsightsModalOpen,
        isDevModalOpen,
        setIsDevModalOpen,
        resetAllDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
