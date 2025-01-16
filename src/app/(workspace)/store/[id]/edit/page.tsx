import { Metadata } from 'next';

// Utils
import { cn } from '@/utils';

export const metadata: Metadata = {
  title: 'Edit Book | Book WebFlow',
  description: 'Edit a book in the store',
  openGraph: {
    title: 'Edit Book | Book WebFlow',
    description: 'Edit a book in the store',
    type: 'website',
  },
};

const EditBookPage = async () => {
  return (
    <section
      className={cn(
        'w-full max-w-screen-3xl mx-auto',
        'px-6 pb-6 pt-6 md:pt-21',
      )}
    >
      {/* TODO: Implement the Edit page */}
      <h1 className="text-2xl font-bold mb-6">Edit Book</h1>
    </section>
  );
};

export default EditBookPage;
