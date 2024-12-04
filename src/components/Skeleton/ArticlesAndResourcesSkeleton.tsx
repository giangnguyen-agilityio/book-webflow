import { Divider } from '@nextui-org/react';
import { cn } from '@nextui-org/theme';

// Constants
import { DEFAULT_ARTICLES_AND_RESOURCES_PER_PAGE } from '@/constants';

// Components
import { Heading } from '@/components';

import { ArticleCardSkeleton } from '.';

const ArticlesAndResourcesSkeleton = () => (
  <section className="background-overlay bg-background-default py-36">
    <div className="container m-auto gap-18 font-inter">
      <div className="text-center mb-12">
        <Heading
          className="font-cardo font-bold text-4xl sm:text-6xl md:text-8xl"
          textColor="text-text-primary"
        >
          Articles & Resources
        </Heading>

        <Divider className="w-13.75 mt-6 mb-12.5 bg-background-tertiary mx-auto" />
      </div>

      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
          'gap-6 xl:gap-8.5',
        )}
      >
        {[...Array(DEFAULT_ARTICLES_AND_RESOURCES_PER_PAGE)].map((_, index) => (
          <ArticleCardSkeleton key={index} />
        ))}
      </div>
    </div>
  </section>
);

export default ArticlesAndResourcesSkeleton;
