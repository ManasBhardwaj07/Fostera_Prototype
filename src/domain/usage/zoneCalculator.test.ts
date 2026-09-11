import { describe, it, expect } from 'vitest';
import { calculateUsageZone, getZoneMeta } from './zoneCalculator';

describe('zoneCalculator', () => {
  describe('calculateUsageZone', () => {
    it('returns GREEN for usage under 2 hours (< 120 mins)', () => {
      expect(calculateUsageZone(0)).toBe('GREEN');
      expect(calculateUsageZone(60)).toBe('GREEN');
      expect(calculateUsageZone(119)).toBe('GREEN');
    });

    it('returns BLUE for usage between 2 and 3 hours (120-179 mins)', () => {
      expect(calculateUsageZone(120)).toBe('BLUE');
      expect(calculateUsageZone(150)).toBe('BLUE');
      expect(calculateUsageZone(179)).toBe('BLUE');
    });

    it('returns YELLOW for usage between 3 and 5 hours (180-299 mins)', () => {
      expect(calculateUsageZone(180)).toBe('YELLOW');
      expect(calculateUsageZone(240)).toBe('YELLOW');
      expect(calculateUsageZone(299)).toBe('YELLOW');
    });

    it('returns ORANGE for usage between 5 and 7 hours (300-419 mins)', () => {
      expect(calculateUsageZone(300)).toBe('ORANGE');
      expect(calculateUsageZone(360)).toBe('ORANGE');
      expect(calculateUsageZone(419)).toBe('ORANGE');
    });

    it('returns RED for usage 7 hours or more (>= 420 mins)', () => {
      expect(calculateUsageZone(420)).toBe('RED');
      expect(calculateUsageZone(500)).toBe('RED');
      expect(calculateUsageZone(1000)).toBe('RED');
    });
  });

  describe('getZoneMeta', () => {
    it('returns correct meta for GREEN', () => {
      const meta = getZoneMeta('GREEN');
      expect(meta.zone).toBe('GREEN');
      expect(meta.name).toBe('Ideal');
    });

    it('returns correct meta for RED', () => {
      const meta = getZoneMeta('RED');
      expect(meta.zone).toBe('RED');
      expect(meta.name).toBe('Action Required');
    });
    
    // Using a default case test for an unknown or edge case fallback
    it('falls back to RED for unknown zones', () => {
      const meta = getZoneMeta('UNKNOWN' as any);
      expect(meta.zone).toBe('RED');
    });
  });
});
