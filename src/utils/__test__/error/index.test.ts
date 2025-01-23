import { ignoredConsoleError } from '@/utils/testUtils';

import { formatErrorMessage, isValidNumberFormat } from '@/utils';

describe('Error Utils', () => {
  beforeEach(() => {
    ignoredConsoleError();
  });

  describe('formatErrorMessage', () => {
    it('should return default message for non-Error objects', () => {
      expect(formatErrorMessage(null)).toBe('Unknown error occurred');
      expect(formatErrorMessage('string error')).toBe('Unknown error occurred');
    });

    it('should handle Error messages correctly', () => {
      expect(formatErrorMessage(new Error('"test message"'))).toBe(
        'test message',
      );
      expect(formatErrorMessage(new Error('normal message'))).toBe(
        'normal message',
      );
    });
  });

  describe('isValidNumberFormat', () => {
    it('should validate integers correctly', () => {
      // Positive integers only
      expect(isValidNumberFormat('123', false, false)).toBe(true);
      expect(isValidNumberFormat('-123', false, false)).toBe(false);

      // With negative allowed
      expect(isValidNumberFormat('-123', false, true)).toBe(true);
    });

    it('should validate decimals correctly', () => {
      // Positive decimals only
      expect(isValidNumberFormat('123.45', true, false)).toBe(true);
      expect(isValidNumberFormat('-123.45', true, false)).toBe(false);

      // With negative allowed
      expect(isValidNumberFormat('-123.45', true, true)).toBe(true);
    });

    it('should reject invalid formats', () => {
      expect(isValidNumberFormat('abc', false, false)).toBe(false);
      expect(isValidNumberFormat('1.2.3', true, false)).toBe(false);
    });
  });
});
