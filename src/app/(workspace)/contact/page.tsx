import type { Metadata } from 'next';

// Components
import { ComingSoon } from '@/components';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with us for any inquiries or support.',
  openGraph: {
    title: 'Contact Us | Book WebFlow',
    description: 'Get in touch with us for any inquiries or support.',
  },
};

export default function ContactPage() {
  return <ComingSoon />;
}
