// Utils
import { wrapper, screen } from '@/utils/testUtils';

// Mock
import { MOCK_ARTICLE_LIST } from '@/mock';

// Constants
import { DEFAULT_LATEST_ARTICLES_NUMBER, DEFAULT_PAGE } from '@/constants';

// APIs
import { getArticleList } from '@/apis';

// Components
import { ArticlesAndResources } from '@/ui';

jest.mock('@/apis', () => ({
  getArticleList: jest.fn(),
}));

describe('ArticlesAndResources component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render articles when data is available', async () => {
    // Mock successful API response with articles
    const mockArticles = MOCK_ARTICLE_LIST.slice(
      0,
      DEFAULT_LATEST_ARTICLES_NUMBER,
    );

    (getArticleList as jest.Mock).mockResolvedValue({
      articles: mockArticles,
      count: mockArticles.length,
    });

    wrapper(await ArticlesAndResources());

    // Check if the section title is rendered
    expect(screen.getByText('Articles & Resources')).toBeInTheDocument();

    // Check if all articles are rendered
    mockArticles.forEach((article) => {
      expect(screen.getByText(article.title)).toBeInTheDocument();
    });
  });

  it('should render empty state when no articles are available', async () => {
    // Mock API response with empty articles array
    (getArticleList as jest.Mock).mockResolvedValue({
      articles: [],
      count: 0,
    });

    wrapper(await ArticlesAndResources());

    // Check if empty state messages are rendered
    expect(
      screen.getByText('No articles available at the moment.'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Check back later for new content!'),
    ).toBeInTheDocument();
  });

  it('should call getArticleList with correct parameters', async () => {
    (getArticleList as jest.Mock).mockResolvedValue({
      articles: [],
      count: 0,
    });

    await ArticlesAndResources();

    expect(getArticleList).toHaveBeenCalledWith(
      DEFAULT_PAGE,
      DEFAULT_LATEST_ARTICLES_NUMBER,
    );
    expect(getArticleList).toHaveBeenCalledTimes(1);
  });
});
