import { AuthError } from 'next-auth';

// APIs
import {
  authenticateUser,
  handleRegisterUser,
  handleSignOut,
  validateUserCredentials,
  checkExistingUser,
  createUser,
} from '@/apis';

// Constants
import { API_PATH, AUTH_MESSAGES, ROUTES } from '@/constants';

// Mock
import { MOCK_USER } from '@/mock';

// Config
import { signIn, signOut } from '@/config';

// Services
import { httpClient } from '@/services';

// Mock dependencies
jest.mock('@/config', () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('@/services', () => ({
  httpClient: {
    get: jest.fn(),
    request: jest.fn().mockResolvedValue({ data: {} }),
  },
  HttpMethod: {
    POST: 'POST',
  },
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

  describe('validateUserCredentials', () => {
    it('should validate correct credentials', async () => {
      const mockUser = { ...MOCK_USER };
      const credentials = {
        username: mockUser.username,
        password: mockUser.password,
      };

      (httpClient.get as jest.Mock).mockResolvedValueOnce({
        users: [mockUser],
      });

      const result = await validateUserCredentials(credentials);

      const { password: _, ...userWithoutPassword } = mockUser;
      expect(result).toEqual({
        success: true,
        user: userWithoutPassword,
      });
      expect(httpClient.get).toHaveBeenCalledWith({
        endpoint: API_PATH.AUTH,
      });
    });

    it('should reject invalid credentials', async () => {
      const mockUser = { ...MOCK_USER };
      const credentials = {
        username: 'wrong',
        password: 'wrong',
      };

      (httpClient.get as jest.Mock).mockResolvedValueOnce({
        users: [mockUser],
      });

      const result = await validateUserCredentials(credentials);

      expect(result).toEqual({
        success: false,
        errorMessage: AUTH_MESSAGES.INVALID_CREDENTIALS,
      });
    });

    it('should handle network errors', async () => {
      (httpClient.get as jest.Mock).mockRejectedValueOnce(new Error());

      const result = await validateUserCredentials({
        username: 'test',
        password: 'test',
      });

      expect(result).toEqual({
        success: false,
        errorMessage: AUTH_MESSAGES.NETWORK_ERROR,
      });
    });
  });

  describe('checkExistingUser', () => {
    it('should detect existing username', async () => {
      const mockUser = { ...MOCK_USER };

      (httpClient.get as jest.Mock).mockResolvedValueOnce({
        users: [mockUser],
      });

      const result = await checkExistingUser(mockUser.username);

      expect(result).toEqual({
        success: false,
        errorMessage: AUTH_MESSAGES.USERNAME_EXISTS,
      });
    });

    it('should allow new username', async () => {
      const mockUser = { ...MOCK_USER };

      (httpClient.get as jest.Mock).mockResolvedValueOnce({
        users: [mockUser],
      });

      const result = await checkExistingUser('newuser');

      expect(result).toEqual({
        success: true,
      });
    });

    it('should handle network errors', async () => {
      (httpClient.get as jest.Mock).mockRejectedValueOnce(new Error());

      const result = await checkExistingUser('test');

      expect(result).toEqual({
        success: false,
        errorMessage: AUTH_MESSAGES.NETWORK_ERROR,
      });
    });
  });

  describe('createUser', () => {
    it('should create new user successfully', async () => {
      const userData = {
        ...MOCK_USER,
        username: 'newUser',
        name: 'New User',
      };

      (httpClient.request as jest.Mock).mockResolvedValue({ data: {} });

      const result = await createUser(userData);

      expect(httpClient.request).toHaveBeenCalled();
      expect(result).toEqual({
        success: true,
      });
    });

    it('should handle registration failure', async () => {
      const userData = {
        ...MOCK_USER,
        username: 'newUser',
        name: 'New User',
      };

      (httpClient.request as jest.Mock).mockRejectedValueOnce(new Error());

      const result = await createUser(userData);

      expect(result).toEqual({
        success: false,
        errorMessage: AUTH_MESSAGES.REGISTRATION_FAILED,
      });
    });
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
      (httpClient.get as jest.Mock).mockResolvedValueOnce({ users: [] });
      (httpClient.request as jest.Mock).mockResolvedValueOnce({});
      (signIn as jest.Mock).mockResolvedValueOnce({});

      const result = await handleRegisterUser(userData);

      expect(signIn).toHaveBeenCalledWith('credentials', {
        username: userData.username,
        password: userData.password,
        redirect: false,
      });
      expect(result).toEqual({ success: true });
    });

    it('should handle existing username', async () => {
      (httpClient.get as jest.Mock).mockResolvedValueOnce({
        users: [{ ...MOCK_USER, username: userData.username }],
      });

      const result = await handleRegisterUser(userData);

      expect(result).toEqual({
        success: false,
        errorMessage: AUTH_MESSAGES.USERNAME_EXISTS,
      });
      expect(signIn).not.toHaveBeenCalled();
    });

    it('should handle network error', async () => {
      (httpClient.get as jest.Mock).mockRejectedValueOnce(new Error());

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
