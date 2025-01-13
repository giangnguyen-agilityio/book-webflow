// Constants
import { DEFAULT_BOOKS_PER_PAGE } from '@/constants';

// Icons
import { PlusIcon } from '@/icons';

// Utils
import { cn } from '@/utils';

// Components
import { BaseSkeleton, Button } from '@/components';

import { BookCardSkeleton } from '.';

const BookListSkeleton = ({ isAdmin }: { isAdmin: boolean }) => (
  <div className="container mx-auto py-12">
    {isAdmin && (
      <div className="flex justify-end mb-6">
        <Button
          aria-label="Add new book"
          color="default"
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
