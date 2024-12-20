// Utils
import { wrapper } from '@/utils/testUtils';

// Components
import {
  ArticleCardSkeleton,
  ArticleListSkeleton,
  ArticlesAndResourcesSkeleton,
  BookCardSkeleton,
  BookListSkeleton,
} from '..';

describe('Skeleton components', () => {
  it('should render ArticleCardSkeleton correctly', () => {
    const { container } = wrapper(<ArticleCardSkeleton />);

    expect(container).toMatchSnapshot();
  });

  it('should render ArticleListSkeleton correctly', () => {
    const { container } = wrapper(<ArticleListSkeleton />);

    expect(container).toMatchSnapshot();
  });

  it('should render ArticlesAndResourcesSkeleton correctly', () => {
    const { container } = wrapper(<ArticlesAndResourcesSkeleton />);

    expect(container).toMatchSnapshot();
  });

  it('should render BookCardSkeleton correctly', () => {
    const { container } = wrapper(<BookCardSkeleton />);

    expect(container).toMatchSnapshot();
  });

  it('should render BookListSkeleton correctly', () => {
    const { container } = wrapper(<BookListSkeleton />);

    expect(container).toMatchSnapshot();
  });
});
