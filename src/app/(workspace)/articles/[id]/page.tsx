import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// APIs
import { getArticleById } from '@/apis';

// Utils
import { cn } from '@/utils';

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
  const { article, error } = await getArticleById(id);

  if (!article || error) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: `${article.title} | Book WebFlow`,
      description: article.description,
      type: 'article',
      url: `/articles/${id}`,
    },
  };
}

export default async function ArticleDetailsPage({
  params,
}: ArticleDetailsPageProps) {
  const { id } = await params;
  const { article, error } = await getArticleById(id);

  if (!article || error) {
    notFound();
  }

  return (
    <>
      <Banner metadataTitle={article.title} />

      <section
        className={cn('w-full bg-background', 'py-10 xl:py-14 3xl:py-21')}
      >
        <ArticleDetail data={article} />
      </section>
    </>
  );
}
