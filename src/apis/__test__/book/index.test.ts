// Constants
import { API_PATH, DEFAULT_BOOKS_PER_PAGE } from '@/constants';

// Mock
import { MOCK_BOOK_LIST } from '@/mock';

// Services
import { httpClient } from '@/services';

// APIs
import { getBookList, getBookById } from '@/apis';

// Mock the httpClient
jest.mock('@/services', () => ({
  httpClient: {
    get: jest.fn(),
  },
}));

describe('Book API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getBookList', () => {
    it('should fetch books with default pagination', async () => {
      // Mock response using mock data
      const mockResponse = {
        books: MOCK_BOOK_LIST.slice(0, DEFAULT_BOOKS_PER_PAGE),
        count: MOCK_BOOK_LIST.length,
      };
      (httpClient.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await getBookList();

      expect(result).toEqual(mockResponse);
      expect(result.books?.length).toBeLessThanOrEqual(DEFAULT_BOOKS_PER_PAGE);
      expect(httpClient.get).toHaveBeenCalledWith({
        endpoint: `${API_PATH.BOOKS}?page=undefined&limit=${DEFAULT_BOOKS_PER_PAGE}`,
      });
    });

    it('should fetch books with custom pagination', async () => {
      const page = 2;
      const limit = 3;
      // Mock response using mock data for page 2
      const mockResponse = {
        books: MOCK_BOOK_LIST.slice(limit, limit * 2), // Get books 4-6
        count: MOCK_BOOK_LIST.length,
      };
      (httpClient.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await getBookList(page, limit);

      expect(result).toEqual(mockResponse);
      expect(result.books?.length).toBeLessThanOrEqual(limit);
      expect(httpClient.get).toHaveBeenCalledWith({
        endpoint: `${API_PATH.BOOKS}?page=${page}&limit=${limit}`,
      });

      // Verify the returned books are different from page 1
      const page1Books = MOCK_BOOK_LIST.slice(0, limit);
      expect(result.books).not.toEqual(page1Books);
    });

    it('should handle empty response', async () => {
      const mockResponse = {
        books: [],
        count: 0,
      };
      (httpClient.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await getBookList();

      expect(result).toEqual(mockResponse);
      expect(result.books).toHaveLength(0);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Failed to fetch books';
      (httpClient.get as jest.Mock).mockRejectedValueOnce(
        new Error(errorMessage),
      );

      const result = await getBookList();

      expect(result).toEqual({
        error: errorMessage,
      });
    });
  });

  describe('getBookById', () => {
    it('should fetch book by id', async () => {
      const targetBook = MOCK_BOOK_LIST[0];
      const mockResponse = {
        books: [targetBook],
      };
      (httpClient.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await getBookById(targetBook.id);

      expect(result).toEqual({
        book: targetBook,
      });
      expect(httpClient.get).toHaveBeenCalledWith({
        endpoint: `${API_PATH.BOOKS}?id=${targetBook.id}`,
      });
    });

    it('should handle non-existent book id', async () => {
      const mockResponse = {
        books: [],
        count: 0,
      };
      (httpClient.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      const { book } = await getBookById('non-existent-id');

      expect(book).toBeUndefined();
      expect(httpClient.get).toHaveBeenCalledWith({
        endpoint: `${API_PATH.BOOKS}?id=non-existent-id`,
      });
    });

    it('should handle errors when fetching by id', async () => {
      const errorMessage = 'Book not found';
      (httpClient.get as jest.Mock).mockRejectedValueOnce(
        new Error(errorMessage),
      );

      const result = await getBookById('1');

      expect(result).toEqual({
        error: errorMessage,
      });
    });

    it('should handle undefined id parameter', async () => {
      const mockResponse = {
        books: [],
        count: 0,
      };
      (httpClient.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      const { book } = await getBookById(undefined);

      expect(book).toBeUndefined();
      expect(httpClient.get).toHaveBeenCalledWith({
        endpoint: `${API_PATH.BOOKS}?id=undefined`,
      });
    });
  });
});
