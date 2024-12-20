import { notFound } from 'next/navigation';
import { cn } from '@nextui-org/react';
import { Metadata } from 'next';

// APIs
import { getArticleById } from '@/apis';

// UI components
import { ArticleDetail } from '@/ui';

// Components
import { Banner } from '@/components';

interface ArticleDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: ArticleDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const articleData = await getArticleById(id);

  if (!articleData) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: articleData.title,
    description: articleData.description,
    openGraph: {
      title: `${articleData.title} | Book WebFlow`,
      description: articleData.description,
      type: 'article',
      url: `/articles/${id}`,
    },
  };
}

export default async function ArticleDetailsPage({
  params,
}: ArticleDetailsPageProps) {
  const { id } = await params;
  const articleData = await getArticleById(id);

  if (!articleData) {
    notFound();
  }

  return (
    <>
      <Banner metadataTitle={articleData.title} />

      <section
        className={cn(
          'w-full bg-background-default',
          'py-10 xl:py-14 3xl:py-21',
        )}
      >
        <ArticleDetail data={articleData} />
      </section>
    </>
  );
}
