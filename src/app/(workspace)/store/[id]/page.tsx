import { notFound } from 'next/navigation';
import { cn } from '@nextui-org/theme';
import { Suspense } from 'react';

import { MOCK_ARTICLE_LIST, MOCK_BOOK_LIST } from '@/mock';

// UI components
import { ArticlesAndResources, Benefits, BookDetail } from '@/ui';

// Components
import { ArticlesAndResourcesSkeleton, BookDetailSkeleton } from '@/components';

interface BookDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const BookDetailsPage = async (props: BookDetailsPageProps) => {
  const { id } = await props.params;

  // TODO: Fetch book details from the database or API instead of using mock data from MOCK_BOOK_LIST
  const bookData = MOCK_BOOK_LIST.find((book) => book.id === id);

  if (!bookData) {
    notFound();
  }

  return (
    <>
      <section
        className={cn(
          'w-full bg-background-default',
          'py-10 xl:py-14 3xl:py-21',
        )}
      >
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-12">
            <Suspense key={id} fallback={<BookDetailSkeleton />}>
              <BookDetail data={bookData} />
            </Suspense>
          </div>
        </div>
      </section>

      <Suspense fallback={<ArticlesAndResourcesSkeleton />}>
        {/* TODO: Will pass the searchParams into the component to fetch the data. */}
        <ArticlesAndResources articles={MOCK_ARTICLE_LIST.slice(0, 3)} />
      </Suspense>

      <Benefits />
    </>
  );
};

export default BookDetailsPage;
