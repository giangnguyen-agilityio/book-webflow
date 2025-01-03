import { z } from 'zod';

// Constants
import { AUTH_MESSAGES } from '@/constants';

// Schema Validation for Login
export const SignInSchema = z.object({
  username: z.string().min(3, AUTH_MESSAGES.USERNAME_MIN),
  password: z.string().min(6, AUTH_MESSAGES.PASSWORD_MIN),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;
