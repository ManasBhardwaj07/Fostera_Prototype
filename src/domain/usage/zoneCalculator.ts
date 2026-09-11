import type { UsageZone } from '../../types';

export interface ZoneMeta {
  zone: UsageZone;
  name: string;
  rangeText: string;
  subtitle: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  badgeBg: string;
  badgeText: string;
  hexColor: string;
}

export function calculateUsageZone(totalMinutes: number): UsageZone {
  if (totalMinutes < 120) return 'GREEN';
  if (totalMinutes < 180) return 'BLUE';
  if (totalMinutes < 300) return 'YELLOW';
  if (totalMinutes < 420) return 'ORANGE';
  return 'RED';
}

export function getZoneMeta(zone: UsageZone): ZoneMeta {
  switch (zone) {
    case 'GREEN':
      return {
        zone,
        name: 'Ideal',
        rangeText: 'Under 2 hrs',
        subtitle: 'Optimal digital balance',
        bgClass: 'bg-emerald-500/10',
        textClass: 'text-emerald-400',
        borderClass: 'border-emerald-500/30',
        badgeBg: 'bg-emerald-500',
        badgeText: 'text-emerald-950',
        hexColor: '#10b981',
      };
    case 'BLUE':
      return {
        zone,
        name: 'Good',
        rangeText: '2–3 hrs',
        subtitle: 'Mindful and healthy usage',
        bgClass: 'bg-sky-500/10',
        textClass: 'text-sky-400',
        borderClass: 'border-sky-500/30',
        badgeBg: 'bg-sky-500',
        badgeText: 'text-sky-950',
        hexColor: '#0ea5e9',
      };
    case 'YELLOW':
      return {
        zone,
        name: 'Awareness',
        rangeText: '3–5 hrs',
        subtitle: 'Attention required on distractions',
        bgClass: 'bg-amber-500/10',
        textClass: 'text-amber-400',
        borderClass: 'border-amber-500/30',
        badgeBg: 'bg-amber-400',
        badgeText: 'text-amber-950',
        hexColor: '#f59e0b',
      };
    case 'ORANGE':
      return {
        zone,
        name: 'Warning',
        rangeText: '5–7 hrs',
        subtitle: 'High risk of digital fatigue',
        bgClass: 'bg-orange-500/10',
        textClass: 'text-orange-400',
        borderClass: 'border-orange-500/30',
        badgeBg: 'bg-orange-500',
        badgeText: 'text-orange-950',
        hexColor: '#f97316',
      };
    case 'RED':
    default:
      return {
        zone: 'RED',
        name: 'Action Required',
        rangeText: 'Above 7 hrs',
        subtitle: 'Immediate intervention recommended',
        bgClass: 'bg-rose-500/10',
        textClass: 'text-rose-400',
        borderClass: 'border-rose-500/30',
        badgeBg: 'bg-rose-500',
        badgeText: 'text-rose-950',
        hexColor: '#f43f5e',
      };
  }
}
