'use server';

import { AuthError } from 'next-auth';

// Types
import type { AuthCredentials, AuthResult, SignUpData } from '@/types';

// Configs
import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from '@/config';

// Constants
import { AUTH_MESSAGES, ROUTES } from '@/constants';

// APIs
import { checkExistingUser, createUser } from '@/apis';

export async function authenticateUser(
  credentials: AuthCredentials,
): Promise<AuthResult> {
  try {
    await nextAuthSignIn('credentials', {
      username: credentials.username,
      password: credentials.password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      errorMessage:
        error instanceof AuthError
          ? AUTH_MESSAGES.AUTH_FAILED
          : AUTH_MESSAGES.NETWORK_ERROR,
    };
  }
}

export async function handleRegisterUser(
  data: SignUpData,
): Promise<AuthResult> {
  try {
    // Validate username availability
    const validationResult = await checkExistingUser(data.username);

    if (!validationResult.success) {
      return validationResult;
    }

    // Create new user account
    const registrationResult = await createUser(data);

    if (!registrationResult.success) {
      return registrationResult;
    }

    // Perform automatic sign in
    await nextAuthSignIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    return { success: true };
  } catch (_error) {
    return {
      success: false,
      errorMessage: AUTH_MESSAGES.NETWORK_ERROR,
    };
  }
}

export async function handleSignOut() {
  await nextAuthSignOut({ redirectTo: ROUTES.SIGN_IN });
}
