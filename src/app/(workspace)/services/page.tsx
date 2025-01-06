import type { Metadata } from 'next';

// Components
import { ComingSoon } from '@/components';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Discover the comprehensive range of book-related services we offer to meet your reading needs.',
  openGraph: {
    title: 'Our Services | Book WebFlow',
    description:
      'Discover the comprehensive range of book-related services we offer to meet your reading needs.',
    type: 'website',
  },
};

export default function ServicesPage() {
  return <ComingSoon />;
}
