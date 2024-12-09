import { notFound } from 'next/navigation';
import { cn } from '@nextui-org/theme';
import { Suspense } from 'react';

// Mock
import { MOCK_ARTICLE_LIST } from '@/mock';

// UI components
import { ArticleDetail } from '@/ui';

// Components
import { ArticleListSkeleton, Banner } from '@/components';

interface ArticleDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ArticleDetailsPage = async (props: ArticleDetailsPageProps) => {
  const { id } = await props.params;

  // TODO: Fetch article details from the database or API instead of using mock data from MOCK_ARTICLE_LIST
  const currentArticle = MOCK_ARTICLE_LIST.find((Article) => Article.id === id);

  if (!currentArticle) {
    notFound();
  }

  return (
    <>
      <Banner metadataTitle={currentArticle.title} />

      <section
        className={cn(
          'w-full bg-background-default',
          'py-10 xl:py-14 3xl:py-21',
        )}
      >
        <Suspense key={id} fallback={<ArticleListSkeleton />}>
          <ArticleDetail data={currentArticle} />
        </Suspense>
      </section>
    </>
  );
};

export default ArticleDetailsPage;
