import { httpClient, HttpMethod } from '@/services';

// Mock the global fetch function
global.fetch = jest.fn();

describe('HttpClient', () => {
  // Clear all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('get method', () => {
    it('should make a successful GET request', async () => {
      // Mock a successful JSON response from the server
      const mockResponse = { data: 'test' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        headers: {
          get: () => 'application/json',
        },
        json: () => Promise.resolve(mockResponse),
      });

      // Test the GET request
      const result = await httpClient.get({ endpoint: '/test' });

      // Verify response matches mock data
      expect(result).toEqual(mockResponse);

      // Verify fetch was called with correct HTTP method and headers
      expect(global.fetch).toHaveBeenCalledWith(expect.any(String), {
        method: HttpMethod.GET,
        headers: {
          Accept: 'application/json',
        },
      });
    });

    it('should handle non-JSON responses', async () => {
      // Mock a plain text response from the server
      const mockResponse = 'plain text response';
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        headers: {
          get: () => 'text/plain',
        },
        text: () => Promise.resolve(mockResponse),
      });

      // Verify plain text responses are handled correctly
      const result = await httpClient.get({ endpoint: '/test' });
      expect(result).toBe(mockResponse);
    });

    it('should throw error for failed requests', async () => {
      const errorMessage = 'Not Found';
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        text: () => Promise.resolve(errorMessage),
      });

      await expect(httpClient.get({ endpoint: '/test' })).rejects.toThrow(
        errorMessage,
      );
    });
  });

  describe('request method', () => {
    it('should make a successful POST request with body', async () => {
      // Mock successful response for POST request
      const mockResponse = { success: true };
      const requestBody = { name: 'test' };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        headers: {
          get: () => 'application/json',
        },
        json: () => Promise.resolve(mockResponse),
      });

      // Make POST request with body data
      const result = await httpClient.request({
        method: HttpMethod.POST,
        endpoint: '/test',
        body: requestBody,
      });

      // Verify response and request format
      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(expect.any(String), {
        method: HttpMethod.POST,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
    });

    it('should handle network errors', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error('Network error'),
      );

      await expect(
        httpClient.request({
          method: HttpMethod.POST,
          endpoint: '/test',
        }),
      ).rejects.toThrow('Network error');
    });

    it('should handle custom headers', async () => {
      // Mock response for testing custom headers
      const mockResponse = { data: 'test' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        headers: {
          get: () => 'application/json',
        },
        json: () => Promise.resolve(mockResponse),
      });

      // Make request with custom authorization header
      await httpClient.request({
        method: HttpMethod.PUT,
        endpoint: '/test',
        config: {
          headers: {
            Authorization: 'Bearer token',
          },
        },
      });

      // Verify custom headers were included in the request
      expect(global.fetch).toHaveBeenCalledWith(expect.any(String), {
        method: HttpMethod.PUT,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer token',
        },
      });
    });
  });
});
