import { z } from 'zod';

// Constants
import { AUTH_MESSAGES } from '@/constants';

// Schema Validation for Login
const SignInSchema = z.object({
  username: z.string().min(3, AUTH_MESSAGES.USERNAME_MIN),
  password: z.string().min(6, AUTH_MESSAGES.PASSWORD_MIN),
});

const SignUpSchema = z.object({
  name: z.string().min(1, AUTH_MESSAGES.NAME_REQUIRED),
  email: z
    .string()
    .min(1, AUTH_MESSAGES.EMAIL_REQUIRED)
    .email(AUTH_MESSAGES.EMAIL_INVALID),
  username: z.string().min(3, AUTH_MESSAGES.USERNAME_MIN),
  password: z.string().min(6, AUTH_MESSAGES.PASSWORD_MIN),
});

export { SignInSchema, SignUpSchema };
