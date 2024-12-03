import { Suspense } from 'react';

// Constants
import { ROUTES } from '@/constants';

// Mocks
import { MOCK_BOOK_LIST } from '@/mock';

// UI components
import { BookList } from '@/ui';

// Components
import { BookListSkeleton } from '@/components';

const Homepage = async () => (
  <Suspense key={ROUTES.HOME} fallback={<BookListSkeleton />}>
    <BookList bookList={MOCK_BOOK_LIST} />
  </Suspense>
);

export default Homepage;
