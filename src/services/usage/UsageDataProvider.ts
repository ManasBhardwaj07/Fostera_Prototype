import type { AppUsage, DailyProgress } from '../../types';

/**
 * ARCHITECTURE BOUNDARY SPECIFICATION:
 *
 * UsageDataProvider defines the abstraction contract for screen time telemetry.
 *
 * CURRENT PROTOTYPE IMPLEMENTATION:
 * - MockUsageDataProvider: supplies deterministic assessment data matching the
 *   exact 4h 32m scenario (YouTube 1h42m, Instagram 1h08m, Chrome 46m, WhatsApp 31m, Spotify 25m).
 *
 * FUTURE PRODUCTION IMPLEMENTATION:
 * - AndroidUsageDataProvider (Kotlin/Jetpack Compose or Capacitor/Bridge):
 *   Queries android.app.usage.UsageStatsManager via native platform channels,
 *   aggregating package statistics over interval boundaries without altering
 *   downstream domain logic (classify -> decide -> act).
 */
export interface UsageDataProvider {
  getTodayAppUsage(): Promise<AppUsage[]>;
  getWeeklyTrend(): Promise<DailyProgress[]>;
}

export class MockUsageDataProvider implements UsageDataProvider {
  // Deterministic 4h 32m scenario (272 total minutes)
  private readonly defaultApps: AppUsage[] = [
    {
      appId: 'youtube',
      appName: 'YouTube',
      usageMinutes: 102, // 1h 42m (37.5% of total)
      category: 'Entertainment',
      icon: '▶',
      color: '#ef4444',
    },
    {
      appId: 'instagram',
      appName: 'Instagram',
      usageMinutes: 68, // 1h 08m (25% of total)
      category: 'Social',
      icon: '📷',
      color: '#e1306c',
    },
    {
      appId: 'chrome',
      appName: 'Chrome',
      usageMinutes: 46, // 46m
      category: 'Browsing',
      icon: '🌐',
      color: '#3b82f6',
    },
    {
      appId: 'whatsapp',
      appName: 'WhatsApp',
      usageMinutes: 31, // 31m
      category: 'Messaging',
      icon: '💬',
      color: '#22c55e',
    },
    {
      appId: 'spotify',
      appName: 'Spotify',
      usageMinutes: 25, // 25m
      category: 'Music',
      icon: '🎧',
      color: '#1db954',
    },
  ];

  // 7-day trend connecting logically to 4h goal reference
  private readonly weeklyHistory: DailyProgress[] = [
    {
      date: '2026-09-05',
      dayName: 'Mon',
      totalUsageMinutes: 225, // 3h 45m
      zone: 'YELLOW',
      goalMinutes: 240,
      focusMinutes: 30,
    },
    {
      date: '2026-09-06',
      dayName: 'Tue',
      totalUsageMinutes: 210, // 3h 30m
      zone: 'YELLOW',
      goalMinutes: 240,
      focusMinutes: 45,
    },
    {
      date: '2026-09-07',
      dayName: 'Wed',
      totalUsageMinutes: 250, // 4h 10m
      zone: 'YELLOW',
      goalMinutes: 240,
      focusMinutes: 25,
    },
    {
      date: '2026-09-08',
      dayName: 'Thu',
      totalUsageMinutes: 230, // 3h 50m
      zone: 'YELLOW',
      goalMinutes: 240,
      focusMinutes: 50,
    },
    {
      date: '2026-09-09',
      dayName: 'Fri',
      totalUsageMinutes: 272, // 4h 32m (TODAY)
      zone: 'YELLOW',
      goalMinutes: 240,
      focusMinutes: 0,
      isToday: true,
    },
    {
      date: '2026-09-10',
      dayName: 'Sat',
      totalUsageMinutes: 195, // 3h 15m
      zone: 'YELLOW',
      goalMinutes: 240,
      focusMinutes: 20,
    },
    {
      date: '2026-09-11',
      dayName: 'Sun',
      totalUsageMinutes: 165, // 2h 45m
      zone: 'BLUE',
      goalMinutes: 240,
      focusMinutes: 35,
    },
  ];

  async getTodayAppUsage(): Promise<AppUsage[]> {
    return Promise.resolve([...this.defaultApps]);
  }

  async getWeeklyTrend(): Promise<DailyProgress[]> {
    return Promise.resolve([...this.weeklyHistory]);
  }
}

export const usageDataProvider: UsageDataProvider = new MockUsageDataProvider();
