import { REGEX_PATTERNS } from '@/constants';

/**
 * Formats error messages for consistent display across the application.
 * Removes surrounding quotes from Error messages if present.
 *
 * @param error - The error to format
 * @returns A clean error message string
 */
export const formatErrorMessage = (error: unknown): string => {
  if (!(error instanceof Error)) {
    return 'Unknown error occurred';
  }

  const message = error.message;

  return message.startsWith('"') && message.endsWith('"')
    ? message.slice(1, -1)
    : message;
};

/**
 * Checks if a given value is a valid number format
 * @param {string} value - The value to check
 * @param {boolean} allowDecimal - Whether to allow decimal numbers
 * @param {boolean} allowNegative - Whether to allow negative numbers
 * @returns {boolean} True if the value is a valid number format, false otherwise
 */
export const isValidNumberFormat = (
  value: string,
  allowDecimal: boolean,
  allowNegative: boolean,
): boolean => {
  if (allowDecimal) {
    return allowNegative
      ? REGEX_PATTERNS.DECIMAL_WITH_NEGATIVE.test(value)
      : REGEX_PATTERNS.DECIMAL_POSITIVE.test(value);
  }

  return allowNegative
    ? REGEX_PATTERNS.INTEGER_WITH_NEGATIVE.test(value)
    : REGEX_PATTERNS.INTEGER_POSITIVE.test(value);
};
