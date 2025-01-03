import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Metadata } from 'next';

// Utils
import { cn } from '@/utils';

// APIs
import { getBookById } from '@/apis';

// UI components
import { ArticlesAndResources, Benefits, BookDetail } from '@/ui';

// Components
import { ArticlesAndResourcesSkeleton } from '@/components';

interface BookDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: BookDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const { book, error } = await getBookById(id);

  if (!book || error) {
    return {
      title: 'Book Not Found',
      description: 'The requested book could not be found',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: book.title,
    description: book.description,
    openGraph: {
      title: `${book.title} | Book WebFlow`,
      description: book.description,
      type: 'book',
      url: `/store/${id}`,
    },
  };
}

const BookDetailsPage = async ({ params }: BookDetailsPageProps) => {
  const { id } = await params;
  const { book, error } = await getBookById(id);

  if (!book || error) {
    notFound();
  }

  return (
    <>
      <section
        className={cn('w-full bg-background', 'py-10 xl:py-14 3xl:py-21')}
      >
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-12">
            <BookDetail data={book} />
          </div>
        </div>
      </section>

      <Suspense fallback={<ArticlesAndResourcesSkeleton />}>
        <ArticlesAndResources />
      </Suspense>

      <Benefits />
    </>
  );
};

export default BookDetailsPage;
