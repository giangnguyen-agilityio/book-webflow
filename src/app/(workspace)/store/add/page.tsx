import { Metadata } from 'next';

// Utils
import { cn } from '@/utils';

// Actions
import { createNewBook } from '@/actions';

// Components
import { BookForm } from '@/components';

export const metadata: Metadata = {
  title: 'Add New Book | Book WebFlow',
  description: 'Add a new book to the store',
  openGraph: {
    title: 'Add New Book | Book WebFlow',
    description: 'Add a new book to the store.',
    type: 'website',
  },
};

const AddBookPage = async () => {
  return (
    <section
      className={cn(
        'w-full max-w-screen-3xl mx-auto',
        'px-6 pb-6 pt-6 md:pt-21',
      )}
    >
      <BookForm onSubmit={createNewBook} />
    </section>
  );
};

export default AddBookPage;
