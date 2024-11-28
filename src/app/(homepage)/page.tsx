import type { Metadata } from 'next';

// Components
import { ComingSoon } from '@/components';

export const metadata: Metadata = {
  title: 'Store',
  description: 'Browse and shop our wide range of products.',
  openGraph: {
    title: 'Store | Book WebFlow',
    description: 'Browse and shop our wide range of products.',
  },
};

export default function StorePage() {
  return <ComingSoon />;
}
