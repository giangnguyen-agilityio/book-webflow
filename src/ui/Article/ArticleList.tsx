// APIs
import { getArticleList } from '@/apis';

// Constants
import { DEFAULT_ARTICLES_PER_PAGE, DEFAULT_PAGE } from '@/constants';

// Components
import { Pagination, Text } from '@/components';

import { ArticleCard } from '.';

interface ArticleListProps {
  page?: number;
}

const ArticleList = async ({ page = DEFAULT_PAGE }: ArticleListProps) => {
  const { articles = [], count = 0 } = await getArticleList(page);
  const pageCount = Math.ceil(count / DEFAULT_ARTICLES_PER_PAGE);

  return (
    <section className="container mx-auto py-12">
      {articles.length > 0 ? (
        <>
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} articleData={article} />
            ))}
          </div>
          {pageCount > DEFAULT_PAGE && <Pagination total={pageCount} />}
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
