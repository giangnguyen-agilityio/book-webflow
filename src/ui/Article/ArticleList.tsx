// Models
import { Article } from '@/models';

// Constants
import { DEFAULT_ARTICLES_PER_PAGE } from '@/constants';

// Components
import { Pagination, Text } from '@/components';

import { ArticleCard } from '.';

interface ArticleListProps {
  articleList: Article[];
}

const ArticleList = ({ articleList = [] }: ArticleListProps) => {
  const pageCount = Math.ceil(articleList.length / DEFAULT_ARTICLES_PER_PAGE);

  return (
    <section className="container mx-auto py-12">
      {articleList.length > 0 ? (
        <>
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articleList.map((article) => (
              <ArticleCard key={article.id} articleData={article} />
            ))}
          </div>
          {articleList.length > DEFAULT_ARTICLES_PER_PAGE && (
            <Pagination total={pageCount} />
          )}
        </>
      ) : (
        <div className="text-center">
          <Text
            className="font-cardo text-3xl font-bold sm:text-4xl"
            textColor="text-text-primary"
            type="wrap"
          >
            No articles were found
          </Text>
          <Text
            className="mt-2 text-small md:text-sm"
            textColor="text-text-secondary"
            type="wrap"
          >
            It looks like our shelves are empty at the moment. Check back later
            for new articles or try adjusting your search.
          </Text>
        </div>
      )}
    </section>
  );
};

export default ArticleList;
