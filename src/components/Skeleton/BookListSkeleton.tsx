// Constants
import { DEFAULT_BOOKS_PER_PAGE } from '@/constants';

// Components
import { BookCardSkeleton } from '.';

const BookListSkeleton = () => (
  <section className="container mx-auto py-12">
    <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(DEFAULT_BOOKS_PER_PAGE)].map((_, index) => (
        <BookCardSkeleton key={index} />
      ))}
    </div>
  </section>
);

export default BookListSkeleton;
