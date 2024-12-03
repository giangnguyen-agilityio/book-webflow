import type { Metadata } from 'next';

// Mocks
import { MOCK_BOOK_LIST } from '@/mock';

// UI Components
import { BookList } from '@/ui';

export const metadata: Metadata = {
  title: 'Store',
  description: 'Browse and shop our wide range of products.',
  openGraph: {
    title: 'Store | Book WebFlow',
    description: 'Browse and shop our wide range of products.',
  },
};

export default function StorePage() {
  return <BookList bookList={MOCK_BOOK_LIST} />;
}
