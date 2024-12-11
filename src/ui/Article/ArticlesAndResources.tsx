import { Divider } from '@nextui-org/react';
import { cn } from '@nextui-org/theme';

// Models
import { Article } from '@/models';

// Components
import { Heading, Text } from '@/components';

import { ArticleCard } from '.';

interface ArticlesAndResourcesProps {
  articles?: Article[];
}

const ArticlesAndResources = ({ articles = [] }: ArticlesAndResourcesProps) => (
  <section
    className={cn(
      'background-overlay bg-background-secondary',
      'py-10 xl:py-30 3xl:py-36',
    )}
  >
    <div className="container m-auto gap-18 font-inter">
      <div className="text-center mb-12">
        <Heading
          className="font-cardo font-bold text-4xl sm:text-6xl md:text-8xl"
          textColor="text-text-primary"
        >
          Articles & Resources
        </Heading>

        <Divider className="h-1 w-13.75 mt-6 mb-12.5 bg-background-tertiary mx-auto" />
      </div>

      {articles.length > 0 ? (
        <div
          className={cn(
            'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
            'gap-6 xl:gap-8.5',
          )}
        >
          {articles.map((item: Article) => (
            <ArticleCard key={item.id} articleData={item} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <Text
            className="text-xl sm:text-2xl"
            textColor="text-text-primary"
            type="wrap"
          >
            No articles available at the moment.
          </Text>
          <Text
            className="text-base sm:text-xl mt-2"
            textColor="text-text-secondary"
            type="wrap"
          >
            Check back later for new content!
          </Text>
        </div>
      )}
    </div>
  </section>
);

export default ArticlesAndResources;
