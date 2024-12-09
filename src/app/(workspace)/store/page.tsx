import { Suspense } from 'react';

// Mocks
import { MOCK_ARTICLE_LIST, MOCK_BOOK_LIST } from '@/mock';

// Types
// import { SearchParams } from '@/types';

// UI components
import { ArticlesAndResources, BookList, NewsletterSignup } from '@/ui';

// Components
import { ArticlesAndResourcesSkeleton, BookListSkeleton } from '@/components';

// type HomepageSearchParamsProps = SearchParams;

const Homepage = async () =>
  // TODO: Add the search parameters to the props
  // {searchParams}: {searchParams?: HomepageSearchParamsProps}
  {
    return (
      <>
        <Suspense
          // TODO: Add key from the searchParams for the suspense to show the fallback correctly
          //  key={page + query}
          fallback={<BookListSkeleton />}
        >
          {/* TODO: Will pass the searchParams into the component to fetch the data. */}
          <BookList bookList={MOCK_BOOK_LIST} />
        </Suspense>

        <Suspense fallback={<ArticlesAndResourcesSkeleton />}>
          {/* TODO: Will pass the searchParams into the component to fetch the data. */}
          <ArticlesAndResources articles={MOCK_ARTICLE_LIST.slice(0, 3)} />
        </Suspense>

        <NewsletterSignup />
      </>
    );
  };

export default Homepage;
