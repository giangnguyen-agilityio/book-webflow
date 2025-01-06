import type { Metadata } from 'next';

// Components
import { NotFoundFallback } from '@/components';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description:
    "The page you are looking for doesn't exist. Please try searching for some other page, or return to the website's homepage.",
  openGraph: {
    title: 'Page Not Found | Book WebFlow',
    description:
      "The page you are looking for doesn't exist. Please try searching for some other page, or return to the website's homepage.",
    type: 'website',
    locale: 'en_US',
  },
};

export default function NotFound() {
  return <NotFoundFallback />;
}
