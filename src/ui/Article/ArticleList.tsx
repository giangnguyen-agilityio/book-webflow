// APIs
import { getArticleList } from '@/apis';

// Constants
import { DEFAULT_ARTICLES_PER_PAGE, DEFAULT_PAGE } from '@/constants';

// Components
import { Message, Pagination } from '@/components';

import { ArticleCard } from '.';

interface ArticleListProps {
  page?: number;
}

const ArticleList = async ({ page = DEFAULT_PAGE }: ArticleListProps) => {
  const { articles, count = 0, error } = await getArticleList(page);
  const pageCount = Math.ceil(count / DEFAULT_ARTICLES_PER_PAGE);

  return (
    <section className="container mx-auto py-12">
      {error && <Message description="Please try again later." title={error} />}

      {articles?.length === 0 ? (
        <Message
          description="It looks like our shelves are empty at the moment. Check back later for new articles or try adjusting your search."
          title="No articles were found"
        />
      ) : (
        <>
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles?.map((article) => (
              <ArticleCard key={article.id} articleData={article} />
            ))}
          </div>
          {pageCount > DEFAULT_PAGE && <Pagination total={pageCount} />}
        </>
      )}
    </section>
  );
};

export default ArticleList;
