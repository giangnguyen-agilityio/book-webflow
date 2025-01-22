// Constants
import { API_PATH, DEFAULT_ARTICLES_PER_PAGE } from '@/constants';

// Mock
import { MOCK_ARTICLE_LIST } from '@/mock';

// Services
import { httpClient } from '@/services';

// APIs
import { getArticleList, getArticleById } from '@/apis';

// Mock the httpClient
jest.mock('@/services', () => ({
  httpClient: {
    get: jest.fn(),
  },
}));

describe('Article API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getArticleList', () => {
    it('should fetch articles with default pagination', async () => {
      // Mock response using mock data
      const mockResponse = {
        articles: MOCK_ARTICLE_LIST.slice(0, DEFAULT_ARTICLES_PER_PAGE),
        count: MOCK_ARTICLE_LIST.length,
      };
      (httpClient.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await getArticleList();

      expect(result).toEqual(mockResponse);
      expect(result.articles?.length).toBeLessThanOrEqual(
        DEFAULT_ARTICLES_PER_PAGE,
      );
      expect(httpClient.get).toHaveBeenCalledWith({
        config: {
          next: {
            tags: [API_PATH.ARTICLES],
          },
        },
        endpoint: `${API_PATH.ARTICLES}?page=undefined&limit=${DEFAULT_ARTICLES_PER_PAGE}`,
      });
    });

    it('should fetch articles with custom pagination', async () => {
      const page = 2;
      const limit = 5;
      // Mock response using mock data for page 2
      const mockResponse = {
        articles: MOCK_ARTICLE_LIST.slice(limit, limit * 2),
        count: MOCK_ARTICLE_LIST.length,
      };
      (httpClient.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await getArticleList(page, limit);

      expect(result).toEqual(mockResponse);
      expect(result.articles?.length).toBeLessThanOrEqual(limit);
      expect(httpClient.get).toHaveBeenCalledWith({
        config: {
          next: {
            tags: [API_PATH.ARTICLES],
          },
        },
        endpoint: `${API_PATH.ARTICLES}?page=${page}&limit=${limit}`,
      });
    });

    it('should handle errors', async () => {
      const errorMessage = 'Network Error';
      (httpClient.get as jest.Mock).mockRejectedValueOnce(
        new Error(errorMessage),
      );

      const result = await getArticleList();

      expect(result).toEqual({
        error: errorMessage,
      });
    });
  });

  describe('getArticleById', () => {
    it('should fetch article by id', async () => {
      const targetArticle = MOCK_ARTICLE_LIST[0];
      const mockResponse = {
        articles: [targetArticle],
      };
      (httpClient.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await getArticleById(targetArticle.id);

      expect(result).toEqual({
        article: targetArticle,
      });
      expect(httpClient.get).toHaveBeenCalledWith({
        config: {
          next: {
            tags: [API_PATH.ARTICLES],
          },
        },
        endpoint: `${API_PATH.ARTICLES}?id=${targetArticle.id}`,
      });
    });

    it('should handle non-existent article id', async () => {
      const mockResponse = {
        articles: [],
        count: 0,
      };
      (httpClient.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      const { article } = await getArticleById('non-existent-id');

      expect(article).toBeUndefined();
      expect(httpClient.get).toHaveBeenCalledWith({
        config: {
          next: {
            tags: [API_PATH.ARTICLES],
          },
        },
        endpoint: `${API_PATH.ARTICLES}?id=non-existent-id`,
      });
    });

    it('should handle errors when fetching by id', async () => {
      const errorMessage = 'Article not found';
      (httpClient.get as jest.Mock).mockRejectedValueOnce(
        new Error(errorMessage),
      );

      const result = await getArticleById('1');

      expect(result).toEqual({
        error: errorMessage,
      });
    });
  });
});
