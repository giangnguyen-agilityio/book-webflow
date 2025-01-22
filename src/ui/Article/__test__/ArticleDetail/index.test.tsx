// Utils
import { wrapper } from '@/utils/testUtils';

// Components
import { ArticleDetail } from '@/ui';

// Mock
import { MOCK_ARTICLE_LIST } from '@/mock';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ back: jest.fn() }),
  usePathname: () => '/articles/1',
}));

jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
}));

describe('ArticleDetail component', () => {
  it('should render correctly', () => {
    const { container } = wrapper(
      <ArticleDetail data={MOCK_ARTICLE_LIST[0]} />,
    );

    expect(container).toMatchSnapshot();
  });
});
