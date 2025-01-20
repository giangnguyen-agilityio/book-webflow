// Actions
import { createNewBook, updateBook, deleteBook } from '@/actions';

// Constants
import { API_PATH } from '@/constants';

// Mock
import { MOCK_DEFAULT_BOOK_ITEM } from '@/mock';

// Services
import { httpClient, HttpMethod } from '@/services';

// Utils
import { formatErrorMessage } from '@/utils';

// Mock dependencies
jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

jest.mock('@/services', () => ({
  httpClient: {
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
