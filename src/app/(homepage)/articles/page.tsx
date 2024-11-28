import type { Metadata } from 'next';

// Components
import { ComingSoon } from '@/components';

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Read our latest articles and blog posts on various topics.',
  openGraph: {
    title: 'Articles | Book WebFlow',
    description: 'Read our latest articles and blog posts on various topics.',
  },
};

export default function ArticlesPage() {
  return <ComingSoon />;
}
