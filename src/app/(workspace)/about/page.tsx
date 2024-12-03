import type { Metadata } from 'next';

// Components
import { ComingSoon } from '@/components';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about our company, our mission, and our team.',
  openGraph: {
    title: 'About Us | Book WebFlow',
    description: 'Learn more about our company, our mission, and our team.',
  },
};

export default function AboutPage() {
  return <ComingSoon />;
}
