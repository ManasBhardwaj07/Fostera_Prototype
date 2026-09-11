import type { AppUsage, AppLimit, Insight, Nudge } from '../../types';
import { formatMinutes } from '../../utils/format';

export function generateDeterministicInsights(
  usageList: AppUsage[],
  limits: Record<string, AppLimit>,
  dailyGoalMinutes: number,
  totalUsageMinutes: number
): Insight[] {
  const insights: Insight[] = [];

  // 1. Dominance insight: YouTube + Instagram
  const yt = usageList.find(a => a.appId === 'youtube');
  const ig = usageList.find(a => a.appId === 'instagram');
  if (yt && ig && totalUsageMinutes > 0) {
    const combined = yt.usageMinutes + ig.usageMinutes;
    const share = Math.round((combined / totalUsageMinutes) * 100);
    insights.push({
      id: 'ins-yt-ig-dominance',
      type: 'recommendation',
      title: 'Major Usage Concentration',
      description: `YouTube + Instagram account for ${share}% of today's usage (${formatMinutes(combined)}).`,
      actionLabel: 'Start Focus',
      actionType: 'focus',
      targetAppId: 'youtube',
    });
  }

  // 2. Over limit insight
  const exceededApps = usageList.filter(app => {
    const lim = limits[app.appId];
    return lim && lim.enabled && app.usageMinutes > lim.limitMinutes;
  });

  if (exceededApps.length > 0) {
    const topExceeded = exceededApps[0];
    const diff = topExceeded.usageMinutes - limits[topExceeded.appId].limitMinutes;
    insights.push({
      id: `ins-over-${topExceeded.appId}`,
      type: 'alert',
      title: `${topExceeded.appName} Limit Exceeded`,
      description: `You are ${formatMinutes(diff)} above your daily ${topExceeded.appName} limit.`,
      actionLabel: 'Start Focus',
      actionType: 'focus',
      targetAppId: topExceeded.appId,
    });
  }

  // 3. Goal status insight
  if (totalUsageMinutes > dailyGoalMinutes) {
    const overGoal = totalUsageMinutes - dailyGoalMinutes;
    insights.push({
      id: 'ins-over-goal',
      type: 'alert',
      title: 'Above Daily Target',
      description: `Today's screen time (${formatMinutes(totalUsageMinutes)}) is ${formatMinutes(overGoal)} over your ${formatMinutes(dailyGoalMinutes)} goal.`,
      actionLabel: 'View Progress',
      actionType: 'progress',
    });
  } else {
    insights.push({
      id: 'ins-goal-on-track',
      type: 'stat',
      title: 'Target On Track',
      description: `You have ${formatMinutes(dailyGoalMinutes - totalUsageMinutes)} remaining within your daily target.`,
      actionLabel: 'View Progress',
      actionType: 'progress',
    });
  }

  // 4. Trend insight
  insights.push({
    id: 'ins-trend-higher',
    type: 'stat',
    title: 'Weekly Usage Trend',
    description: 'Your usage is trending higher than earlier this week (Wed: 4h 10m, Thu: 3h 50m).',
    actionLabel: 'Set Limit',
    actionType: 'limit',
    targetAppId: 'youtube',
  });

  return insights;
}

export function generateDeterministicNudges(
  usageList: AppUsage[],
  limits: Record<string, AppLimit>,
  dailyGoalMinutes: number,
  totalUsageMinutes: number
): Nudge[] {
  const nudges: Nudge[] = [];

  // Check exceeded apps
  const yt = usageList.find(a => a.appId === 'youtube');
  const ytLimit = limits['youtube'];
  if (yt && ytLimit && ytLimit.enabled && yt.usageMinutes > ytLimit.limitMinutes) {
    const diff = yt.usageMinutes - ytLimit.limitMinutes;
    nudges.push({
      id: 'nudge-yt-exceeded',
      message: `You've spent ${formatMinutes(diff)} above your YouTube limit.`,
      severity: 'critical',
      actionable: true,
      actionLabel: 'Start Focus',
      actionType: 'focus',
      targetAppId: 'youtube',
      dismissed: false,
    });
  }

  // Check screen time target
  if (totalUsageMinutes > dailyGoalMinutes) {
    const diff = totalUsageMinutes - dailyGoalMinutes;
    nudges.push({
      id: 'nudge-goal-exceeded',
      message: `Your screen time is ${formatMinutes(diff)} above your ${formatMinutes(dailyGoalMinutes)} goal.`,
      severity: 'warning',
      actionable: true,
      actionLabel: 'Review Limits',
      actionType: 'limit',
      dismissed: false,
    });
  }

  return nudges;
}
