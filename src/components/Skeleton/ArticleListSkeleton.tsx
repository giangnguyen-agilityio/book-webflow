import { cn } from '@nextui-org/theme';

// Constants
import { DEFAULT_ARTICLES_PER_PAGE } from '@/constants';

import { ArticleCardSkeleton } from '.';

const ArticleListSkeleton = () => (
  <section className="background-overlay bg-background-default py-36">
    <div className="container m-auto gap-18 font-inter">
      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
          'gap-6 xl:gap-8.5',
        )}
      >
        {[...Array(DEFAULT_ARTICLES_PER_PAGE)].map((_, index) => (
          <ArticleCardSkeleton key={index} />
        ))}
      </div>
    </div>
  </section>
);

export default ArticleListSkeleton;
