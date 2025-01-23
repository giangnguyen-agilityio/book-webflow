export const REGEX_PATTERNS = {
  // Date format: YYYY-MM-DD
  DATE_FORMAT: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,

  // Letters and spaces only
  LETTERS_ONLY: /^[a-zA-Z\s]+$/,

  // Password validation patterns
  NO_SPACES: /^\S*$/,
  ONE_NUMBER: /(?=.*\d)/,
  ONE_SPECIAL_CHAR: /(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?])/,

  // Username validation: alphanumeric, dot, underscore, hyphen only, 3-30 chars
  USERNAME_PATTERN: /^[a-zA-Z0-9._-]{3,30}$/,

  // Full name: letters, spaces, hyphens, apostrophes (for names like O'Connor)
  NAME_PATTERN: /^[a-zA-Z\s'-]+$/,

  // Number
  DECIMAL_POSITIVE: /^\d*\.?\d*$/,
  DECIMAL_WITH_NEGATIVE: /^-?\d*\.?\d*$/,
  INTEGER_POSITIVE: /^\d*$/,
  INTEGER_WITH_NEGATIVE: /^-?\d*$/,
};
