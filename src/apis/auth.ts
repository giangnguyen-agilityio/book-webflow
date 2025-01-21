'use server';

import { AuthError } from 'next-auth';

// Types
import type { AuthCredentials, AuthResult, SignUpData } from '@/types';

// Configs
import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from '@/config';

// Constants
import { API_PATH, AUTH_MESSAGES, ROUTES } from '@/constants';

// Utils
import { generateRandomAvatar } from '@/utils';

// Services
import { httpClient, HttpMethod } from '@/services';

// Models
import { User, UserRole } from '@/models';

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

export async function validateUserCredentials({
  username,
  password,
}: AuthCredentials): Promise<AuthResult> {
  try {
    const { users } = await httpClient.get<{ users: User[] }>({
      endpoint: API_PATH.AUTH,
    });

    const matchedUser = users.find(
      (user) => user.username === username && user.password === password,
    );

    if (!matchedUser) {
      return {
        success: false,
        errorMessage: AUTH_MESSAGES.INVALID_CREDENTIALS,
      };
    }

    const { password: _, ...userWithoutPassword } = matchedUser;
    return { success: true, user: userWithoutPassword };
  } catch (_error) {
    return {
      success: false,
      errorMessage: AUTH_MESSAGES.NETWORK_ERROR,
    };
  }
}

export async function checkExistingUser(username: string): Promise<AuthResult> {
  try {
    const { users } = await httpClient.get<{ users: User[] }>({
      endpoint: API_PATH.AUTH,
    });

    const isExistingUser = users.some((user) => user.username === username);

    if (isExistingUser) {
      return {
        success: false,
        errorMessage: AUTH_MESSAGES.USERNAME_EXISTS,
      };
    }

    return { success: true };
  } catch (_error) {
    return {
      success: false,
      errorMessage: AUTH_MESSAGES.NETWORK_ERROR,
    };
  }
}

export async function createUser(userData: SignUpData): Promise<AuthResult> {
  try {
    await httpClient.request({
      endpoint: API_PATH.AUTH,
      method: HttpMethod.POST,
      body: {
        ...userData,
        image: generateRandomAvatar(),
        role: UserRole.USER,
        createdAt: new Date().toISOString(),
      },
    });

    return { success: true };
  } catch (_error) {
    return {
      success: false,
      errorMessage: AUTH_MESSAGES.REGISTRATION_FAILED,
    };
  }
}
