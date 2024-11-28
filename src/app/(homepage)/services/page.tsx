import type { Metadata } from 'next';

// Components
import { ComingSoon } from '@/components';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Discover the range of services we offer to meet your needs.',
  openGraph: {
    title: 'Our Services | Book WebFlow',
    description: 'Discover the range of services we offer to meet your needs.',
  },
};

export default function ServicesPage() {
  return <ComingSoon />;
}
