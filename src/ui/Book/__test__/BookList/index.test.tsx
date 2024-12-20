// Utils
import { screen, wrapper } from '@/utils/testUtils';

// Mock
import { MOCK_BOOK_LIST } from '@/mock';

// APIs
import { getBookList } from '@/apis';

// Constants
import { DEFAULT_PAGE } from '@/constants';

// Components
import { BookList } from '@/ui';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => ({ replace: jest.fn() }),
}));

jest.mock('@/apis', () => ({
  getBookList: jest.fn(),
}));

describe('BookList component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render books when data is available', async () => {
    // Mock successful API response with books
    const mockBooks = MOCK_BOOK_LIST;

    (getBookList as jest.Mock).mockResolvedValue({
      books: mockBooks,
      count: mockBooks.length,
    });

    wrapper(await BookList({ page: DEFAULT_PAGE }));

    // Check if all books are rendered
    mockBooks.forEach((book) => {
      expect(screen.getByText(book.title)).toBeInTheDocument();
    });
  });
});
