// APIs
import { getBookList } from '@/apis';

// Constants
import { DEFAULT_BOOKS_PER_PAGE, DEFAULT_PAGE } from '@/constants';

// Components
import { Message, Pagination } from '@/components';

import { BookCard } from '.';

interface BookListProps {
  page?: number;
}

const BookList = async ({ page = DEFAULT_PAGE }: BookListProps) => {
  const { books, count = 0, error } = await getBookList(page);
  const pageCount = Math.ceil(count / DEFAULT_BOOKS_PER_PAGE);

  return (
    <section className="container mx-auto py-12">
      {error && <Message description="Please try again later." title={error} />}

      {books?.length === 0 ? (
        <Message
          description="It looks like our shelves are empty at the moment. Check back later for new arrivals or try adjusting your search."
          title="No books found"
        />
      ) : (
        <>
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {books?.map((book) => <BookCard key={book.id} bookData={book} />)}
          </div>
          {pageCount > DEFAULT_PAGE && <Pagination total={pageCount} />}
        </>
      )}
    </section>
  );
};

export default BookList;
