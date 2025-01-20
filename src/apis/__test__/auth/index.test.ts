// Constants
import { API_PATH, AUTH_MESSAGES } from '@/constants';

// Mock
import { MOCK_USER } from '@/mock';

// Services
import { httpClient } from '@/services';

// APIs
import { validateUserCredentials, checkExistingUser, createUser } from '@/apis';

// Mock the httpClient
jest.mock('@/services', () => ({
  httpClient: {
    get: jest.fn(),
    request: jest.fn().mockResolvedValue({ data: {} }),
  },
  HttpMethod: {
    POST: 'POST',
  },
}));

describe('Auth API', () => {
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
});
