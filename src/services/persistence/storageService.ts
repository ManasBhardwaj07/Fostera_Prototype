import type {
  UserProfile,
  AppLimit,
  FocusSession,
  ScheduleRule,
  ReductionPlan,
  UserReward,
} from '../../types';

const STORAGE_KEYS = {
  USER_PROFILE: 'fostera_user_profile_v3',
  APP_LIMITS: 'fostera_app_limits_v3',
  FOCUS_HISTORY: 'fostera_focus_history_v3',
  ACTIVE_FOCUS: 'fostera_active_focus_v3',
  SCHEDULE_RULES: 'fostera_schedule_rules_v3',
  REDUCTION_PLAN: 'fostera_reduction_plan_v3',
  USER_REWARD: 'fostera_user_reward_v3',
  DISMISSED_NUDGES: 'fostera_dismissed_nudges_v3',
};

export const DEFAULT_USER_PROFILE: UserProfile = {
  userId: 'usr_manas_01',
  userName: 'Manas',
  dailyGoalMinutes: 240, // 4 hours
  onboardingComplete: true, // true by default so demo starts smoothly, but user can re-trigger onboarding!
  distractionAppIds: ['youtube', 'instagram'],
};

export const DEFAULT_APP_LIMITS: Record<string, AppLimit> = {
  // Empty initially as per demo scenario: user sets YouTube 1h limit in step 7!
};

export const DEFAULT_SCHEDULE_RULES: ScheduleRule[] = [
  {
    id: 'sched_study_hours',
    name: 'Study Hours',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    startTime: '09:00',
    endTime: '12:00',
    restrictedAppIds: ['youtube', 'instagram'],
    enabled: true,
  },
  {
    id: 'sched_night_winddown',
    name: 'Sleep Routine',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    startTime: '23:00',
    endTime: '07:00',
    restrictedAppIds: ['youtube', 'instagram', 'chrome'],
    enabled: false,
  },
];

export const DEFAULT_REDUCTION_PLAN: ReductionPlan = {
  appId: 'youtube',
  appName: 'YouTube',
  startingAllowance: 120, // 2 hours
  targetAllowance: 60, // 1 hour
  currentAllowance: 120,
  stepMinutes: 15,
  enabled: true,
  steps: [
    { day: 'Today', allowanceMinutes: 120, isCurrent: true },
    { day: 'Tomorrow', allowanceMinutes: 105 },
    { day: 'Day 3', allowanceMinutes: 90 },
    { day: 'Day 4', allowanceMinutes: 75 },
    { day: 'Day 5', allowanceMinutes: 60 },
  ],
};

export const DEFAULT_USER_REWARD: UserReward = {
  streakDays: 4,
  todayFocusMinutes: 0,
  weeklyImprovementPercent: 18,
  completedFocusSessions: 12,
  badges: [
    {
      id: 'badge_first_focus',
      title: 'First Focus',
      description: 'Completed your first 25-minute distraction-free session',
      icon: '🎯',
      unlocked: true,
      unlockedAt: '2026-09-08',
    },
    {
      id: 'badge_3day_streak',
      title: '3-Day Streak',
      description: 'Maintained your focus goals for 3 consecutive days',
      icon: '🔥',
      unlocked: true,
      unlockedAt: '2026-09-10',
    },
    {
      id: 'badge_goal_achieved',
      title: 'Goal Achieved',
      description: 'Stayed within daily screen time target',
      icon: '🏆',
      unlocked: false,
    },
    {
      id: 'badge_mindful_monk',
      title: 'Mindful Monk',
      description: 'Achieved 7 consecutive days of optimal screen time',
      icon: '🧘',
      unlocked: false,
    },
  ],
};

class StorageService {
  private get<T>(key: string, fallback: T): T {
    try {
      const item = localStorage.getItem(key);
      if (!item) return fallback;
      return JSON.parse(item) as T;
    } catch {
      return fallback;
    }
  }

  private set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage write error', e);
    }
  }

  getUserProfile(): UserProfile {
    return this.get<UserProfile>(STORAGE_KEYS.USER_PROFILE, DEFAULT_USER_PROFILE);
  }

  saveUserProfile(profile: UserProfile): void {
    this.set(STORAGE_KEYS.USER_PROFILE, profile);
  }

  getAppLimits(): Record<string, AppLimit> {
    return this.get<Record<string, AppLimit>>(STORAGE_KEYS.APP_LIMITS, DEFAULT_APP_LIMITS);
  }

  saveAppLimits(limits: Record<string, AppLimit>): void {
    this.set(STORAGE_KEYS.APP_LIMITS, limits);
  }

  getFocusHistory(): FocusSession[] {
    return this.get<FocusSession[]>(STORAGE_KEYS.FOCUS_HISTORY, []);
  }

  saveFocusHistory(history: FocusSession[]): void {
    this.set(STORAGE_KEYS.FOCUS_HISTORY, history);
  }

  getActiveFocus(): FocusSession | null {
    return this.get<FocusSession | null>(STORAGE_KEYS.ACTIVE_FOCUS, null);
  }

  saveActiveFocus(session: FocusSession | null): void {
    this.set(STORAGE_KEYS.ACTIVE_FOCUS, session);
  }

  getScheduleRules(): ScheduleRule[] {
    return this.get<ScheduleRule[]>(STORAGE_KEYS.SCHEDULE_RULES, DEFAULT_SCHEDULE_RULES);
  }

  saveScheduleRules(rules: ScheduleRule[]): void {
    this.set(STORAGE_KEYS.SCHEDULE_RULES, rules);
  }

  getReductionPlan(): ReductionPlan {
    return this.get<ReductionPlan>(STORAGE_KEYS.REDUCTION_PLAN, DEFAULT_REDUCTION_PLAN);
  }

  saveReductionPlan(plan: ReductionPlan): void {
    this.set(STORAGE_KEYS.REDUCTION_PLAN, plan);
  }

  getUserReward(): UserReward {
    return this.get<UserReward>(STORAGE_KEYS.USER_REWARD, DEFAULT_USER_REWARD);
  }

  saveUserReward(reward: UserReward): void {
    this.set(STORAGE_KEYS.USER_REWARD, reward);
  }

  getDismissedNudges(): string[] {
    return this.get<string[]>(STORAGE_KEYS.DISMISSED_NUDGES, []);
  }

  saveDismissedNudges(ids: string[]): void {
    this.set(STORAGE_KEYS.DISMISSED_NUDGES, ids);
  }

  resetAll(): void {
    try {
      localStorage.clear();
    } catch {}
  }
}

export const storageService = new StorageService();
