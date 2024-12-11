import { Metadata } from 'next';
import { Suspense } from 'react';

// Types
import { SearchParams } from '@/types';

// Constants
import { DEFAULT_LATEST_ARTICLES_NUMBER, DEFAULT_PAGE } from '@/constants';

// APIs
import { getArticleList, getBookList } from '@/apis';

// UI components
import { ArticlesAndResources, BookList, NewsletterSignup } from '@/ui';

// Components
import { ArticlesAndResourcesSkeleton, BookListSkeleton } from '@/components';

type StorePageProps = {
  searchParams?: Promise<SearchParams>;
};

export const metadata: Metadata = {
  title: 'Store',
  description: 'Browse and shop our wide range of books and products.',
  openGraph: {
    title: 'Store | Book WebFlow',
    description: 'Browse and shop our wide range of books and products.',
    type: 'website',
  },
};

const StorePage = async ({ searchParams }: StorePageProps) => {
  const { page = DEFAULT_PAGE } = (await searchParams) || {};

  // Fetch data in parallel for better performance
  const [bookListData, articleListData] = await Promise.all([
    getBookList(page),
    getArticleList(page, DEFAULT_LATEST_ARTICLES_NUMBER),
  ]);

  const { books, count } = bookListData;
  const { articles } = articleListData;

  return (
    <>
      <Suspense key={page} fallback={<BookListSkeleton />}>
        <BookList bookList={books} count={count} />
      </Suspense>

      <Suspense fallback={<ArticlesAndResourcesSkeleton />}>
        <ArticlesAndResources articles={articles} />
      </Suspense>

      <NewsletterSignup />
    </>
  );
};

export default StorePage;
