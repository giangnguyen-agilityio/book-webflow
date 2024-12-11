import { notFound } from 'next/navigation';
import { cn } from '@nextui-org/theme';
import { Suspense } from 'react';
import { Metadata } from 'next';

// Constants
import { DEFAULT_LATEST_ARTICLES_NUMBER, DEFAULT_PAGE } from '@/constants';

// APIs
import { getBookById, getArticleList } from '@/apis';

// UI components
import { ArticlesAndResources, Benefits, BookDetail } from '@/ui';

// Components
import { ArticlesAndResourcesSkeleton, BookDetailSkeleton } from '@/components';

interface BookDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: BookDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const bookData = await getBookById(id);

  if (!bookData) {
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
    title: bookData.title,
    description: bookData.description,
    openGraph: {
      title: `${bookData.title} | Book WebFlow`,
      description: bookData.description,
      type: 'book',
      url: `/store/${id}`,
    },
  };
}

const BookDetailsPage = async ({ params }: BookDetailsPageProps) => {
  const { id } = await params;
  const [bookData, articleListData] = await Promise.all([
    getBookById(id),
    getArticleList(DEFAULT_PAGE, DEFAULT_LATEST_ARTICLES_NUMBER),
  ]);

  if (!bookData) {
    notFound();
  }

  const { articles } = articleListData;

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
            <Suspense fallback={<BookDetailSkeleton />}>
              <BookDetail data={bookData} />
            </Suspense>
          </div>
        </div>
      </section>

      <Suspense fallback={<ArticlesAndResourcesSkeleton />}>
        <ArticlesAndResources articles={articles} />
      </Suspense>

      <Benefits />
    </>
  );
};

export default BookDetailsPage;
