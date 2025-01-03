import { User } from '@/models';

type AuthCredentials = {
  username: string;
  password: string;
};

type UserSession = Omit<User, 'password'>;

type AuthResult = {
  success: boolean;
  message?: string;
};

export type { AuthCredentials, UserSession, AuthResult };
