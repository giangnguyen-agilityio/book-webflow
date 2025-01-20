// Utils
import {
  screen,
  wrapper,
  userEvent,
  ignoredConsoleError,
} from '@/utils/testUtils';

// Constants
import { BOOK_MESSAGES, ROUTES } from '@/constants';

// Context
import { useCartContext, useToast } from '@/context';

// Mock
import { MOCK_DEFAULT_BOOK_ITEM } from '@/mock';

// Components
import { BookCard } from '@/ui';

const mockRouter = {
  push: jest.fn(),
  refresh: jest.fn(),
};

const mockBook = MOCK_DEFAULT_BOOK_ITEM;

const defaultProps = {
  bookData: mockBook,
  isAdmin: false,
  totalItems: 10,
  currentPage: 1,
  itemsPerPage: 6,
};

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => mockRouter,
  usePathname: () => '/store',
}));

jest.mock('@/context', () => ({
  ...jest.requireActual('@/context'),
  useCartContext: jest.fn(() => ({
    cartItems: [],
    isLoading: false,
    addToCart: jest.fn().mockResolvedValue(undefined),
  })),
  useToast: jest.fn(() => ({
    addToast: jest.fn(),
  })),
}));

jest.mock('@/actions', () => ({
  ...jest.requireActual('@/actions'),
  deleteBook: jest.fn().mockResolvedValue({ error: null }),
}));

describe('BookCard component', () => {
  const mockAddToCart = jest.fn().mockResolvedValue(undefined);
  const mockAddToast = jest.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
    ignoredConsoleError();
    (useCartContext as jest.Mock).mockReturnValue({
      cartItems: [],
      isLoading: false,
      addToCart: mockAddToCart,
    });
    (useToast as jest.Mock).mockReturnValue({
      addToast: mockAddToast,
    });
  });

  it('should render correctly for normal user', () => {
    const { container } = wrapper(<BookCard {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should render correctly for admin user', () => {
    const { container } = wrapper(
      <BookCard {...defaultProps} isAdmin={true} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should navigate to book detail page when clicked', () => {
    wrapper(<BookCard {...defaultProps} />);
    const link = screen.getByRole('link', {
      name: new RegExp(mockBook.title, 'i'),
    });

    expect(link).toHaveAttribute('href', `${ROUTES.STORE}/${mockBook.id}`);
  });

  it('should handle add to cart action', async () => {
    wrapper(<BookCard {...defaultProps} />);
    const addToCartButton = screen.getByRole('button', {
      name: /add to cart/i,
    });

    await user.click(addToCartButton);

    expect(mockAddToCart).toHaveBeenCalledWith(mockBook.id, 1);
  });

  it('should not show order button for admin user', () => {
    wrapper(<BookCard {...defaultProps} isAdmin={true} />);
    const orderButton = screen.queryByRole('button', { name: /add to cart/i });

    expect(orderButton).not.toBeInTheDocument();
  });

  it('should show out of stock when quantity is 0', () => {
    const outOfStockBook = { ...mockBook, quantity: 0 };
    wrapper(<BookCard {...defaultProps} bookData={outOfStockBook} />);

    const button = screen.getByRole('button', { name: /out of stock/i });

    expect(button).toBeDisabled();
  });

  it('should handle delete book action', async () => {
    wrapper(<BookCard {...defaultProps} isAdmin={true} />);

    const deleteButton = screen.getByLabelText('Delete book button');
    await user.click(deleteButton);

    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    await user.click(confirmButton);

    expect(mockAddToast).toHaveBeenCalledWith(
      BOOK_MESSAGES.DELETE_BOOK_SUCCESS,
      'success',
    );
  });

  it('should navigate to previous page when deleting last item', async () => {
    wrapper(
      <BookCard
        {...defaultProps}
        currentPage={2}
        isAdmin={true}
        itemsPerPage={6}
        totalItems={7}
      />,
    );

    const deleteButton = screen.getByLabelText('Delete book button');
    await user.click(deleteButton);

    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    await user.click(confirmButton);

    expect(mockRouter.push).toHaveBeenCalledWith('/store?page=1');
  });

  it('should show correct available quantity based on cart items', () => {
    const cartQuantity = 3;
    (useCartContext as jest.Mock).mockReturnValue({
      cartItems: [{ bookId: mockBook.id, quantity: cartQuantity }],
      isLoading: false,
      addToCart: mockAddToCart,
    });

    wrapper(<BookCard {...defaultProps} />);

    const button = screen.getByRole('button', { name: /add to cart/i });

    expect(button).toBeEnabled();
  });

  it('should handle edit book navigation', async () => {
    wrapper(<BookCard {...defaultProps} isAdmin={true} />);

    const editButton = screen.getByLabelText('Edit book button');

    await user.click(editButton);

    expect(mockRouter.push).toHaveBeenCalledWith(
      `${ROUTES.STORE}/${mockBook.id}/edit`,
    );
  });

  it('should not close delete modal when loading', async () => {
    (useCartContext as jest.Mock).mockReturnValue({
      cartItems: [],
      isLoading: true,
      addToCart: mockAddToCart,
    });

    wrapper(<BookCard {...defaultProps} isAdmin={true} />);

    const deleteButton = screen.getByLabelText('Delete book button');
    await user.click(deleteButton);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
  });
});
