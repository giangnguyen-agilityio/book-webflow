import Link from 'next/link';

// APIs
import { getBookList } from '@/apis';

// Constants
import {
  DEFAULT_BOOKS_PER_PAGE,
  DEFAULT_PAGE,
  ROUTES_ADMIN,
} from '@/constants';

// Icons
import { PlusIcon } from '@/icons';

// Utils
import { cn } from '@/utils';

// Components
import { Button, Message, Pagination } from '@/components';

import { BookCard } from '.';

interface BookListProps {
  page?: number;
  isAdmin: boolean;
}

const BookList = async ({ page = DEFAULT_PAGE, isAdmin }: BookListProps) => {
  const { books, count = 0, error } = await getBookList(page);
  const pageCount = Math.ceil(count / DEFAULT_BOOKS_PER_PAGE);

  return (
    <section className="container mx-auto py-12">
      {error && <Message description="Please try again later." title={error} />}

      {isAdmin && (
        <div className="flex justify-end mb-6">
          <Button
            aria-label="Add new book"
            as={Link}
            color="default"
            href={ROUTES_ADMIN.STORE.ADD}
            radius="sm"
            startContent={<PlusIcon customClass="w-5 h-5" />}
            variant="solid"
            className={cn(
              'h-full p-2',
              'font-cardo text-base sm:text-lg font-extrabold',
            )}
          >
            Add New
          </Button>
        </div>
      )}

      {books?.length === 0 ? (
        <Message
          description="It looks like our shelves are empty at the moment. Check back later for new arrivals or try adjusting your search."
          title="No books found"
        />
      ) : (
        <>
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {books?.map((book) => (
              <BookCard
                key={book.id}
                bookData={book}
                currentPage={page}
                isAdmin={isAdmin}
                itemsPerPage={DEFAULT_BOOKS_PER_PAGE}
                totalItems={count}
              />
            ))}
          </div>
          {pageCount > DEFAULT_PAGE && <Pagination total={pageCount} />}
        </>
      )}
    </section>
  );
};

export default BookList;
