import { describe, it, expect } from 'vitest';
import { evaluateAppLimit } from './limitEvaluator';

describe('limitEvaluator', () => {
  describe('evaluateAppLimit', () => {
    it('returns NO_LIMIT if limit is not provided', () => {
      const result = evaluateAppLimit(30);
      expect(result.status).toBe('NO_LIMIT');
      expect(result.percentUsed).toBe(0);
      expect(result.isOver).toBe(false);
    });

    it('returns NO_LIMIT if limit is disabled', () => {
      const result = evaluateAppLimit(30, { appId: 'test', limitMinutes: 60, enabled: false });
      expect(result.status).toBe('NO_LIMIT');
      expect(result.isOver).toBe(false);
    });

    it('returns UNDER if usage is less than limit', () => {
      const result = evaluateAppLimit(30, { appId: 'test', limitMinutes: 60, enabled: true });
      expect(result.status).toBe('UNDER');
      expect(result.diffMinutes).toBe(30);
      expect(result.isOver).toBe(false);
      expect(result.percentUsed).toBe(50);
    });

    it('returns AT_LIMIT if usage is exactly equal to limit', () => {
      const result = evaluateAppLimit(60, { appId: 'test', limitMinutes: 60, enabled: true });
      expect(result.status).toBe('AT_LIMIT');
      expect(result.diffMinutes).toBe(0);
      expect(result.isOver).toBe(false);
      expect(result.percentUsed).toBe(100);
    });

    it('returns EXCEEDED if usage is greater than limit', () => {
      const result = evaluateAppLimit(75, { appId: 'test', limitMinutes: 60, enabled: true });
      expect(result.status).toBe('EXCEEDED');
      expect(result.diffMinutes).toBe(15);
      expect(result.isOver).toBe(true);
      expect(result.percentUsed).toBe(125);
    });

    it('caps percentUsed at 200', () => {
      const result = evaluateAppLimit(180, { appId: 'test', limitMinutes: 60, enabled: true });
      expect(result.status).toBe('EXCEEDED');
      expect(result.percentUsed).toBe(200);
    });
  });
});
