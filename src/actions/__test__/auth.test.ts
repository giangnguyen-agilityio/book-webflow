import { AuthError } from 'next-auth';

// Actions
import { authenticateUser, handleRegisterUser, handleSignOut } from '@/actions';

// Constants
import { AUTH_MESSAGES, ROUTES } from '@/constants';

// Mock
import { MOCK_USER } from '@/mock';

// APIs
import { checkExistingUser, createUser } from '@/apis';

// Config
import { signIn, signOut } from '@/config';

// Mock dependencies
jest.mock('@/config', () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('@/apis', () => ({
  checkExistingUser: jest.fn(),
  createUser: jest.fn(),
}));

jest.mock('next-auth', () => ({
  AuthError: class AuthError extends Error {
    constructor() {
      super('Auth Error');
      this.name = 'AuthError';
    }
  },
}));

describe('Auth Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('authenticateUser', () => {
    const credentials = {
      username: MOCK_USER.username,
      password: MOCK_USER.password,
    };

    it('should authenticate user successfully', async () => {
      (signIn as jest.Mock).mockResolvedValueOnce({});

      const result = await authenticateUser(credentials);

      expect(signIn).toHaveBeenCalledWith('credentials', {
        username: credentials.username,
        password: credentials.password,
        redirect: false,
      });
      expect(result).toEqual({ success: true });
    });

    it('should handle authentication error', async () => {
      (signIn as jest.Mock).mockImplementation(() => {
        throw new AuthError();
      });

      const result = await authenticateUser(credentials);
      expect(result).toEqual({
        success: false,
        errorMessage: AUTH_MESSAGES.AUTH_FAILED,
      });
    });
  });

  describe('handleRegisterUser', () => {
    const userData = {
      ...MOCK_USER,
      username: 'newUser',
      name: 'New User',
    };

    it('should register and sign in user successfully', async () => {
      (checkExistingUser as jest.Mock).mockResolvedValueOnce({ success: true });
      (createUser as jest.Mock).mockResolvedValueOnce({ success: true });
      (signIn as jest.Mock).mockResolvedValueOnce({});

      const result = await handleRegisterUser(userData);

      expect(checkExistingUser).toHaveBeenCalledWith(userData.username);
      expect(createUser).toHaveBeenCalledWith(userData);
      expect(signIn).toHaveBeenCalledWith('credentials', {
        username: userData.username,
        password: userData.password,
        redirect: false,
      });
      expect(result).toEqual({ success: true });
    });

    it('should handle existing username', async () => {
      const errorMessage = AUTH_MESSAGES.USERNAME_EXISTS;
      (checkExistingUser as jest.Mock).mockResolvedValueOnce({
        success: false,
        errorMessage,
      });

      const result = await handleRegisterUser(userData);

      expect(result).toEqual({
        success: false,
        errorMessage,
      });
      expect(createUser).not.toHaveBeenCalled();
      expect(signIn).not.toHaveBeenCalled();
    });

    it('should handle registration failure', async () => {
      (checkExistingUser as jest.Mock).mockResolvedValueOnce({ success: true });
      (createUser as jest.Mock).mockResolvedValueOnce({
        success: false,
        errorMessage: AUTH_MESSAGES.REGISTRATION_FAILED,
      });

      const result = await handleRegisterUser(userData);

      expect(result).toEqual({
        success: false,
        errorMessage: AUTH_MESSAGES.REGISTRATION_FAILED,
      });
      expect(signIn).not.toHaveBeenCalled();
    });

    it('should handle network error', async () => {
      (checkExistingUser as jest.Mock).mockRejectedValueOnce(new Error());

      const result = await handleRegisterUser(userData);

      expect(result).toEqual({
        success: false,
        errorMessage: AUTH_MESSAGES.NETWORK_ERROR,
      });
    });
  });

  describe('handleSignOut', () => {
    it('should sign out successfully', async () => {
      await handleSignOut();

      expect(signOut).toHaveBeenCalledWith({
        redirectTo: ROUTES.SIGN_IN,
      });
    });
  });
});
