export type UsageZone = 'GREEN' | 'BLUE' | 'YELLOW' | 'ORANGE' | 'RED';
export type LimitStatus = 'UNDER' | 'AT_LIMIT' | 'EXCEEDED' | 'NO_LIMIT';
export type FocusStatus = 'idle' | 'active' | 'completed' | 'cancelled';
export type FocusPurpose = 'Study' | 'Work' | 'Deep Focus';
export type NavigationTab = 'TODAY' | 'FOCUS' | 'PROGRESS';
export type InsightActionType = 'focus' | 'limit' | 'schedule' | 'reduction' | 'progress';

export interface UserProfile {
  userId: string;
  userName: string;
  dailyGoalMinutes: number;
  onboardingComplete: boolean;
  distractionAppIds: string[];
}

export interface AppUsage {
  appId: string;
  appName: string;
  usageMinutes: number;
  category: string;
  icon: string;
  color: string;
}

export interface AppLimit {
  appId: string;
  limitMinutes: number;
  enabled: boolean;
}

export interface FocusSession {
  id: string;
  durationMinutes: number;
  remainingSeconds: number;
  selectedAppIds: string[];
  status: FocusStatus;
  startedAt?: string;
  endedAt?: string;
  purpose: FocusPurpose;
}

export interface ScheduleRule {
  id: string;
  name: string;
  days: string[];
  startTime: string;
  endTime: string;
  restrictedAppIds: string[];
  enabled: boolean;
}

export interface ReductionPlanStep {
  day: string;
  allowanceMinutes: number;
  isCurrent?: boolean;
}

export interface ReductionPlan {
  appId: string;
  appName: string;
  startingAllowance: number;
  targetAllowance: number;
  currentAllowance: number;
  stepMinutes: number;
  enabled: boolean;
  steps: ReductionPlanStep[];
}

export interface DailyProgress {
  date: string;
  dayName: string;
  totalUsageMinutes: number;
  zone: UsageZone;
  goalMinutes: number;
  focusMinutes: number;
  isToday?: boolean;
}

export interface Insight {
  id: string;
  type: 'alert' | 'recommendation' | 'stat';
  title: string;
  description: string;
  actionLabel?: string;
  actionType?: InsightActionType;
  targetAppId?: string;
}

export interface Nudge {
  id: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  actionable: boolean;
  actionLabel?: string;
  actionType?: 'focus' | 'limit' | 'dismiss';
  targetAppId?: string;
  dismissed: boolean;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface UserReward {
  streakDays: number;
  todayFocusMinutes: number;
  weeklyImprovementPercent: number;
  completedFocusSessions: number;
  badges: Badge[];
}
