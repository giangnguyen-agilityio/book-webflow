import { API_PATH, AUTH_MESSAGES } from '@/constants';

// Types
import { AuthCredentials, AuthResult, SignUpData } from '@/types';

// Utils
import { generateRandomAvatar } from '@/utils';

// Services
import { httpClient, HttpMethod } from '@/services';

// Models
import { User, UserRole } from '@/models';

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
