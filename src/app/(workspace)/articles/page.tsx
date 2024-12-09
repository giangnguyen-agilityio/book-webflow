import type { Metadata } from 'next';
import { Suspense } from 'react';

// Mock
import { MOCK_ARTICLE_LIST } from '@/mock';

// UI Components
import { ArticleList } from '@/ui';

// Components
import { ArticleListSkeleton, Banner } from '@/components';

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Read our latest articles and blog posts on various topics.',
  openGraph: {
    title: 'Articles | Book WebFlow',
    description: 'Read our latest articles and blog posts on various topics.',
  },
};

const ArticlesPage = () => (
  <>
    <Banner
      metadataDescription={metadata.description}
      metadataTitle={metadata.title}
    />
    <Suspense
      // TODO: Add key from the searchParams for the suspense to show the fallback correctly
      //  key={page + query}
      fallback={<ArticleListSkeleton />}
    >
      {/* TODO: Will pass the searchParams into the component to fetch the data. */}
      <ArticleList articleList={MOCK_ARTICLE_LIST} />
    </Suspense>
  </>
);

export default ArticlesPage;
