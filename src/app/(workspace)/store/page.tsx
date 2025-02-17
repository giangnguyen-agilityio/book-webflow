import { Metadata } from 'next';
import { Suspense } from 'react';

// Types
import { SearchParams } from '@/types';

// Constants
import { DEFAULT_PAGE } from '@/constants';

// Configs
import { auth } from '@/config';

// Models
import { UserRole } from '@/models';

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
  const session = await auth();
  const isAdmin = session?.user?.role === UserRole.ADMIN;

  return (
    <>
      <Suspense key={page} fallback={<BookListSkeleton isAdmin={isAdmin} />}>
        <BookList isAdmin={isAdmin} page={page} />
      </Suspense>

      <Suspense fallback={<ArticlesAndResourcesSkeleton />}>
        <ArticlesAndResources />
      </Suspense>

      <NewsletterSignup />
    </>
  );
};

export default StorePage;
