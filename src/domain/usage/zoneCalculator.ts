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
        bgClass: 'bg-emerald-50',
        textClass: 'text-emerald-800',
        borderClass: 'border-emerald-200',
        badgeBg: 'bg-emerald-600',
        badgeText: 'text-white',
        hexColor: '#059669',
      };
    case 'BLUE':
      return {
        zone,
        name: 'Good',
        rangeText: '2–3 hrs',
        subtitle: 'Mindful and controlled',
        bgClass: 'bg-sky-50',
        textClass: 'text-sky-800',
        borderClass: 'border-sky-200',
        badgeBg: 'bg-sky-600',
        badgeText: 'text-white',
        hexColor: '#0284c7',
      };
    case 'YELLOW':
      return {
        zone,
        name: 'Awareness',
        rangeText: '3–5 hrs',
        subtitle: 'Attention required on distractions',
        bgClass: 'bg-amber-50',
        textClass: 'text-amber-800',
        borderClass: 'border-amber-200',
        badgeBg: 'bg-amber-500',
        badgeText: 'text-slate-900',
        hexColor: '#d97706',
      };
    case 'ORANGE':
      return {
        zone,
        name: 'Warning',
        rangeText: '5–7 hrs',
        subtitle: 'High risk of digital fatigue',
        bgClass: 'bg-orange-50',
        textClass: 'text-orange-800',
        borderClass: 'border-orange-200',
        badgeBg: 'bg-orange-500',
        badgeText: 'text-white',
        hexColor: '#ea580c',
      };
    case 'RED':
    default:
      return {
        zone: 'RED',
        name: 'Action Required',
        rangeText: 'Above 7 hrs',
        subtitle: 'Immediate intervention recommended',
        bgClass: 'bg-rose-50',
        textClass: 'text-rose-800',
        borderClass: 'border-rose-200',
        badgeBg: 'bg-rose-600',
        badgeText: 'text-white',
        hexColor: '#e11d48',
      };
  }
}
