import { User } from '@/models';

type AuthCredentials = {
  username: string;
  password: string;
};

type UserSession = Omit<User, 'password'>;

type AuthResult = {
  user?: UserSession;
  success?: boolean;
  errorMessage?: string;
};

type SignUpData = AuthCredentials & {
  name: string;
  email: string;
};

export type { AuthCredentials, UserSession, AuthResult, SignUpData };
