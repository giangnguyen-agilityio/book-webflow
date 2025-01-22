import { z } from 'zod';

// Constants
import { AUTH_MESSAGES, REGEX_PATTERNS } from '@/constants';

// Schema Validation for Login
const SignInSchema = z.object({
  username: z
    .string()
    .min(3, AUTH_MESSAGES.USERNAME_MIN)
    .max(30, AUTH_MESSAGES.USERNAME_MAX)
    .regex(REGEX_PATTERNS.USERNAME_PATTERN, AUTH_MESSAGES.USERNAME_PATTERN),
  password: z.string().min(6, AUTH_MESSAGES.PASSWORD_MIN),
});

const SignUpSchema = z.object({
  name: z
    .string()
    .min(1, AUTH_MESSAGES.NAME_REQUIRED)
    .max(50, AUTH_MESSAGES.NAME_MAX)
    .regex(REGEX_PATTERNS.NAME_PATTERN, AUTH_MESSAGES.NAME_PATTERN)
    .transform((name) =>
      name
        .trim()
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .split(' ')
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(' '),
    ),
  email: z
    .string()
    .min(1, AUTH_MESSAGES.EMAIL_REQUIRED)
    .email(AUTH_MESSAGES.EMAIL_INVALID),
  username: z
    .string()
    .min(3, AUTH_MESSAGES.USERNAME_MIN)
    .max(30, AUTH_MESSAGES.USERNAME_MAX)
    .regex(REGEX_PATTERNS.USERNAME_PATTERN, AUTH_MESSAGES.USERNAME_PATTERN),
  password: z
    .string()
    .min(6, AUTH_MESSAGES.PASSWORD_MIN)
    .regex(REGEX_PATTERNS.NO_SPACES, AUTH_MESSAGES.PASSWORD_NO_SPACES)
    .regex(REGEX_PATTERNS.ONE_NUMBER, AUTH_MESSAGES.PASSWORD_NUMBER)
    .regex(
      REGEX_PATTERNS.ONE_SPECIAL_CHAR,
      AUTH_MESSAGES.PASSWORD_SPECIAL_CHAR,
    ),
});

export { SignInSchema, SignUpSchema };
