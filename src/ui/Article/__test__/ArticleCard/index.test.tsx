// Utils
import { screen, wrapper } from '@/utils/testUtils';

// Constants
import { ROUTES } from '@/constants';

// Components
import { ArticleCard } from '@/ui';

// Mock
import { MOCK_ARTICLE_LIST } from '@/mock';

const mockArticle = MOCK_ARTICLE_LIST[0];

describe('ArticleCard component', () => {
  it('should render correctly', () => {
    const { container } = wrapper(<ArticleCard articleData={mockArticle} />);

    expect(container).toMatchSnapshot();
  });

  it('should link to article detail page', () => {
    wrapper(<ArticleCard articleData={mockArticle} />);

    const link = screen.getByRole('link');

    expect(link).toHaveAttribute(
      'href',
      `${ROUTES.ARTICLES}/${mockArticle.id}`,
    );
  });
});
