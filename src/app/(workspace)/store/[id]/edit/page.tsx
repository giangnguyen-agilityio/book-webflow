import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Utils
import { cn } from '@/utils';

// APIs
import { getBookById, updateBook } from '@/apis';

// Components
import { BookForm } from '@/components';

interface EditBookPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata: Metadata = {
  title: 'Edit Book | Book WebFlow',
  description: 'Edit a book in the store',
  openGraph: {
    title: 'Edit Book | Book WebFlow',
    description: 'Edit a book in the store',
    type: 'website',
  },
};

const EditBookPage = async ({ params }: EditBookPageProps) => {
  const { id } = await params;
  const { book, error } = await getBookById(id);

  if (!book || error) {
    notFound();
  }

  return (
    <section
      className={cn(
        'w-full max-w-screen-3xl mx-auto',
        'px-6 pb-6 pt-6 md:pt-21',
      )}
    >
      <BookForm data={book} onSubmit={updateBook} />
    </section>
  );
};

export default EditBookPage;
