'use server';

import { AuthError } from 'next-auth';

// Types
import { AuthCredentials, AuthResult } from '@/types';

// Configs
import { signIn } from '@/config';

// Constants
import { AUTH_MESSAGES } from '@/constants';

export const authenticateUser = async (
  formData: AuthCredentials,
): Promise<AuthResult> => {
  try {
    await signIn('credentials', {
      ...formData,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        message: AUTH_MESSAGES.AUTH_FAILED,
      };
    }

    return {
      success: false,
      message: AUTH_MESSAGES.NETWORK_ERROR,
    };
  }
};
