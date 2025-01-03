import { Divider } from '@nextui-org/react';

// Utils
import { cn } from '@/utils';

// Models
import { Article } from '@/models';

// APIs
import { getArticleList } from '@/apis';

// Constants
import { DEFAULT_LATEST_ARTICLES_NUMBER, DEFAULT_PAGE } from '@/constants';

// Components
import { Message, Heading } from '@/components';

import { ArticleCard } from '.';

const ArticlesAndResources = async () => {
  const { articles, error } = await getArticleList(
    DEFAULT_PAGE,
    DEFAULT_LATEST_ARTICLES_NUMBER,
  );

  return (
    <section
      className={cn(
        'background-overlay bg-background-100',
        'py-10 xl:py-30 3xl:py-36',
      )}
    >
      <div className="container m-auto gap-18 font-inter">
        <div className="text-center mb-12">
          <Heading
            className="font-cardo font-bold text-4xl sm:text-6xl md:text-8xl"
            textColor="text-primary"
          >
            Articles & Resources
          </Heading>

          <Divider className="h-1 w-13.75 mt-6 mb-12.5 bg-secondary mx-auto" />
        </div>

        {error && (
          <Message
            description="Please try again later."
            title={error}
            classNames={{
              title: 'text-xl sm:text-2xl',
              description: 'text-base sm:text-xl',
            }}
          />
        )}

        {articles?.length === 0 ? (
          <Message
            description="Please try again later or check your connection."
            title="No articles available at the moment."
            classNames={{
              title: 'text-xl sm:text-2xl',
              description: 'text-base sm:text-xl',
            }}
          />
        ) : (
          <div
            className={cn(
              'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
              'gap-6 xl:gap-8.5',
            )}
          >
            {articles?.map((item: Article) => (
              <ArticleCard key={item.id} articleData={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticlesAndResources;
