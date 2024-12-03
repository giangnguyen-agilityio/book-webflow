import { notFound } from 'next/navigation';
import { cn } from '@nextui-org/theme';
import { Suspense } from 'react';

import { MOCK_BOOK_LIST } from '@/mock';

// UI components
import { BookDetail } from '@/ui';

// Components
import { BookDetailSkeleton } from '@/components';

interface BookDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const BookDetailsPage = async (props: BookDetailsPageProps) => {
  const { id } = await props.params;

  // TODO: Fetch book details from the database or API instead of using mock data from MOCK_BOOK_LIST
  const bookData = await MOCK_BOOK_LIST.find((book) => book.id === id);

  if (!bookData) {
    notFound();
  }

  return (
    <section
      className={cn(
        'w-full',
        'py-14 md:py-30 lg:py-30 3xl:py-21',
        'bg-background-default',
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
  );
};

export default BookDetailsPage;
