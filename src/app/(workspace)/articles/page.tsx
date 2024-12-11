import type { Metadata } from 'next';
import { Suspense } from 'react';

// APIs
import { getArticleList } from '@/apis';

// Types
import { SearchParams } from '@/types';

// Constants
import { DEFAULT_PAGE } from '@/constants';

// UI Components
import { ArticleList } from '@/ui';

// Components
import { ArticleListSkeleton, Banner } from '@/components';

type ArticlesPageProps = {
  searchParams?: Promise<SearchParams>;
};

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Read our latest articles and blog posts on books, literature, and reading.',
  openGraph: {
    title: 'Articles | Book WebFlow',
    description:
      'Read our latest articles and blog posts on books, literature, and reading.',
    type: 'website',
  },
};

const ArticlesPage = async ({ searchParams }: ArticlesPageProps) => {
  const { page = DEFAULT_PAGE } = (await searchParams) || {};
  const { articles, count } = await getArticleList(page);

  return (
    <>
      <Banner
        metadataDescription={metadata.description}
        metadataTitle={metadata.title}
      />
      <Suspense key={page} fallback={<ArticleListSkeleton />}>
        <ArticleList articleList={articles} count={count} />
      </Suspense>
    </>
  );
};

export default ArticlesPage;
