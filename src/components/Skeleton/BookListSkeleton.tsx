// Constants
import { DEFAULT_BOOKS_PER_PAGE } from '@/constants';

// Components
import { BaseSkeleton } from '@/components';

import { BookCardSkeleton } from '.';

const BookListSkeleton = () => (
  <div className="container mx-auto py-12">
    <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(DEFAULT_BOOKS_PER_PAGE)].map((_, index) => (
        <BookCardSkeleton key={index} />
      ))}
    </div>
    <div className="w-full flex justify-end mt-12 py-12">
      <BaseSkeleton className="h-10 w-40" />
    </div>
  </div>
);

export default BookListSkeleton;
