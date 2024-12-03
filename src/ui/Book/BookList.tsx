// Models
import { Book } from '@/models';

// Constants
import { DEFAULT_BOOKS_PER_PAGE } from '@/constants';

// Components
import { Pagination, Text } from '@/components';

import { BookCard } from '.';

interface BookListProps {
  bookList: Book[];
}

const BookList = ({ bookList = [] }: BookListProps) => {
  const pageCount = Math.ceil(bookList.length / DEFAULT_BOOKS_PER_PAGE);

  return (
    <section className="container mx-auto py-12">
      {bookList.length > 0 ? (
        <>
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {bookList.map((book) => (
              <BookCard key={book.id} bookData={book} />
            ))}
          </div>
          {bookList.length > DEFAULT_BOOKS_PER_PAGE && (
            <Pagination total={pageCount} />
          )}
        </>
      ) : (
        <div className="text-center">
          <Text
            className="font-cardo text-3xl font-bold sm:text-4xl"
            textColor="text-text-primary"
            type="wrap"
          >
            No books found
          </Text>
          <Text
            className="mt-2 text-small md:text-sm"
            textColor="text-text-secondary"
            type="wrap"
          >
            It looks like our shelves are empty at the moment. Check back later
            for new arrivals or try adjusting your search.
          </Text>
        </div>
      )}
    </section>
  );
};

export default BookList;
