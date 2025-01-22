// APIs
import {
  createNewBook,
  updateBook,
  deleteBook,
  getBookList,
  getBookById,
} from '@/apis';

// Constants
import { API_PATH, DEFAULT_BOOKS_PER_PAGE } from '@/constants';

// Mock
import { MOCK_DEFAULT_BOOK_ITEM, MOCK_BOOK_LIST } from '@/mock';

// Services
import { httpClient, HttpMethod } from '@/services';

// Utils
import { formatErrorMessage } from '@/utils';

// Mock dependencies
jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
}));

jest.mock('@/services', () => ({
  httpClient: {
    get: jest.fn(),
    request: jest.fn(),
  },
  HttpMethod: {
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
  },
}));

jest.mock('@/utils', () => ({
  formatErrorMessage: jest.fn(),
}));

describe('Book Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getBookList', () => {
    it('should fetch books with default pagination', async () => {
      const mockResponse = {
        books: MOCK_BOOK_LIST.slice(0, DEFAULT_BOOKS_PER_PAGE),
        count: MOCK_BOOK_LIST.length,
      };
      (httpClient.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await getBookList();

      expect(result).toEqual(mockResponse);
      expect(result.books?.length).toBeLessThanOrEqual(DEFAULT_BOOKS_PER_PAGE);
      expect(httpClient.get).toHaveBeenCalledWith({
        config: {
          next: {
            tags: [API_PATH.BOOKS],
          },
        },
        endpoint: `${API_PATH.BOOKS}?page=undefined&limit=${DEFAULT_BOOKS_PER_PAGE}`,
      });
    });

    it('should fetch books with custom pagination', async () => {
      const page = 2;
      const limit = 3;
      const mockResponse = {
        books: MOCK_BOOK_LIST.slice(limit, limit * 2),
        count: MOCK_BOOK_LIST.length,
      };
      (httpClient.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await getBookList(page, limit);

      expect(result).toEqual(mockResponse);
      expect(result.books?.length).toBeLessThanOrEqual(limit);
      expect(httpClient.get).toHaveBeenCalledWith({
        config: {
          next: {
            tags: [API_PATH.BOOKS],
          },
        },
        endpoint: `${API_PATH.BOOKS}?page=${page}&limit=${limit}`,
      });

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
      (formatErrorMessage as jest.Mock).mockReturnValueOnce(errorMessage);

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
        config: {
          next: {
            tags: [API_PATH.BOOKS],
          },
        },
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
        config: {
          next: {
            tags: [API_PATH.BOOKS],
          },
        },
        endpoint: `${API_PATH.BOOKS}?id=non-existent-id`,
      });
    });

    it('should handle errors when fetching by id', async () => {
      const errorMessage = 'Book not found';

      (httpClient.get as jest.Mock).mockRejectedValueOnce(
        new Error(errorMessage),
      );
      (formatErrorMessage as jest.Mock).mockReturnValueOnce(errorMessage);

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
        config: {
          next: {
            tags: [API_PATH.BOOKS],
          },
        },
        endpoint: `${API_PATH.BOOKS}?id=undefined`,
      });
    });
  });

  describe('createNewBook', () => {
    it('should create new book successfully', async () => {
      const mockResponse = { book: MOCK_DEFAULT_BOOK_ITEM };
      (httpClient.request as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await createNewBook(MOCK_DEFAULT_BOOK_ITEM);

      expect(httpClient.request).toHaveBeenCalledWith({
        endpoint: API_PATH.BOOKS,
        method: HttpMethod.POST,
        body: MOCK_DEFAULT_BOOK_ITEM,
      });
      expect(result).toEqual({ book: MOCK_DEFAULT_BOOK_ITEM });
    });

    it('should handle error when creating book', async () => {
      const mockError = 'Create book failed';
      (httpClient.request as jest.Mock).mockRejectedValueOnce(new Error());
      (formatErrorMessage as jest.Mock).mockReturnValueOnce(mockError);

      const result = await createNewBook(MOCK_DEFAULT_BOOK_ITEM);

      expect(result).toEqual({ error: mockError });
    });
  });

  describe('updateBook', () => {
    it('should update book successfully', async () => {
      const mockResponse = { book: MOCK_DEFAULT_BOOK_ITEM };
      (httpClient.request as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await updateBook(MOCK_DEFAULT_BOOK_ITEM);

      expect(httpClient.request).toHaveBeenCalledWith({
        endpoint: `${API_PATH.BOOKS}/${MOCK_DEFAULT_BOOK_ITEM.id}`,
        method: HttpMethod.PUT,
        body: MOCK_DEFAULT_BOOK_ITEM,
      });
      expect(result).toEqual({ book: MOCK_DEFAULT_BOOK_ITEM });
    });

    it('should handle error when updating book', async () => {
      const mockError = 'Update book failed';
      (httpClient.request as jest.Mock).mockRejectedValueOnce(new Error());
      (formatErrorMessage as jest.Mock).mockReturnValueOnce(mockError);

      const result = await updateBook(MOCK_DEFAULT_BOOK_ITEM);

      expect(result).toEqual({ error: mockError });
    });
  });

  describe('deleteBook', () => {
    it('should delete book successfully', async () => {
      const mockResponse = { book: MOCK_DEFAULT_BOOK_ITEM };
      (httpClient.request as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await deleteBook(MOCK_DEFAULT_BOOK_ITEM.id);

      expect(httpClient.request).toHaveBeenCalledWith({
        endpoint: `${API_PATH.BOOKS}/${MOCK_DEFAULT_BOOK_ITEM.id}`,
        method: HttpMethod.DELETE,
      });
      expect(result).toEqual({ book: MOCK_DEFAULT_BOOK_ITEM });
    });

    it('should handle error when deleting book', async () => {
      const mockError = 'Delete book failed';
      (httpClient.request as jest.Mock).mockRejectedValueOnce(new Error());
      (formatErrorMessage as jest.Mock).mockReturnValueOnce(mockError);

      const result = await deleteBook(MOCK_DEFAULT_BOOK_ITEM.id);

      expect(result).toEqual({ error: mockError });
    });
  });
});
