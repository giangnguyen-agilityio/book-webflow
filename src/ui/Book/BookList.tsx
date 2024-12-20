// APIs
import { getBookList } from '@/apis';

// Constants
import { DEFAULT_BOOKS_PER_PAGE, DEFAULT_PAGE } from '@/constants';

// Components
import { Pagination, Text } from '@/components';

import { BookCard } from '.';

interface BookListProps {
  page?: number;
}

const BookList = async ({ page = DEFAULT_PAGE }: BookListProps) => {
  const { books = [], count = 0 } = await getBookList(page);
  const pageCount = Math.ceil(count / DEFAULT_BOOKS_PER_PAGE);

  return (
    <section className="container mx-auto py-12">
      {books.length > 0 ? (
        <>
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <BookCard key={book.id} bookData={book} />
            ))}
          </div>
          {pageCount > DEFAULT_PAGE && <Pagination total={pageCount} />}
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
