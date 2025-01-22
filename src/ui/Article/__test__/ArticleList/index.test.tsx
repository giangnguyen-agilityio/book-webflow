// Utils
import { screen, wrapper } from '@/utils/testUtils';

// Mock
import { MOCK_ARTICLE_LIST } from '@/mock';

// APIs
import { getArticleList } from '@/apis';

// Constants
import { DEFAULT_PAGE } from '@/constants';

// Components
import { ArticleList } from '@/ui';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => ({ replace: jest.fn() }),
}));

jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
}));

jest.mock('@/apis', () => ({
  getArticleList: jest.fn(),
}));

describe('ArticleList component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render articles when data is available', async () => {
    // Mock successful API response with articles
    const mockArticles = MOCK_ARTICLE_LIST;

    (getArticleList as jest.Mock).mockResolvedValue({
      articles: mockArticles,
      count: mockArticles.length,
    });

    wrapper(await ArticleList({ page: DEFAULT_PAGE }));

    // Check if all articles are rendered
    mockArticles.forEach((article) => {
      expect(screen.getByText(article.title)).toBeInTheDocument();
    });
  });
});
