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
