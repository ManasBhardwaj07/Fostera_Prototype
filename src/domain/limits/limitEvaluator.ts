import type { LimitStatus, AppLimit } from '../../types';
import { formatMinutes } from '../../utils/format';

export interface EvaluatedLimit {
  status: LimitStatus;
  limitMinutes: number;
  usageMinutes: number;
  diffMinutes: number;
  statusText: string;
  statusBadgeClass: string;
  percentUsed: number;
  isOver: boolean;
}

export function evaluateAppLimit(usageMinutes: number, limit?: AppLimit): EvaluatedLimit {
  if (!limit || !limit.enabled || limit.limitMinutes <= 0) {
    return {
      status: 'NO_LIMIT',
      limitMinutes: 0,
      usageMinutes,
      diffMinutes: 0,
      statusText: 'No limit set',
      statusBadgeClass: 'bg-slate-800 text-slate-400 border border-slate-700/60',
      percentUsed: 0,
      isOver: false,
    };
  }

  const limitMinutes = limit.limitMinutes;
  const percentUsed = Math.min(Math.round((usageMinutes / limitMinutes) * 100), 200);

  if (usageMinutes > limitMinutes) {
    const diff = usageMinutes - limitMinutes;
    return {
      status: 'EXCEEDED',
      limitMinutes,
      usageMinutes,
      diffMinutes: diff,
      statusText: `${formatMinutes(diff)} over limit`,
      statusBadgeClass: 'bg-rose-500/15 text-rose-400 border border-rose-500/40 font-semibold',
      percentUsed,
      isOver: true,
    };
  }

  if (usageMinutes === limitMinutes) {
    return {
      status: 'AT_LIMIT',
      limitMinutes,
      usageMinutes,
      diffMinutes: 0,
      statusText: 'At daily limit',
      statusBadgeClass: 'bg-amber-500/15 text-amber-400 border border-amber-500/40 font-semibold',
      percentUsed: 100,
      isOver: false,
    };
  }

  const diff = limitMinutes - usageMinutes;
  return {
    status: 'UNDER',
    limitMinutes,
    usageMinutes,
    diffMinutes: diff,
    statusText: `${formatMinutes(diff)} remaining`,
    statusBadgeClass: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 font-medium',
    percentUsed,
    isOver: false,
  };
}
