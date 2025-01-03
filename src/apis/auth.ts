'use server';

// Constants
import { API_PATH, AUTH_MESSAGES } from '@/constants';

// Types
import { AuthCredentials } from '@/types';

// Utils
import { formatErrorMessage } from '@/utils';

// Services
import { httpClient } from '@/services';

// Models
import { User } from '@/models';

// Types
import { UserSession } from '@/types';

interface AuthResult {
  user?: UserSession;
  error?: string;
}

export async function validateUserCredentials({
  username,
  password,
}: AuthCredentials): Promise<AuthResult> {
  try {
    const response = await httpClient.get<{ users: User[] }>({
      endpoint: API_PATH.AUTH,
    });

    const matchedUser = response.users.find(
      (user) => user.username === username && user.password === password,
    );

    if (!matchedUser) {
      return {
        error: AUTH_MESSAGES.INVALID_CREDENTIALS,
      };
    }

    const { password: _, ...userWithoutPassword } = matchedUser;
    return { user: userWithoutPassword };
  } catch (error) {
    return {
      error: formatErrorMessage(error),
    };
  }
}
