// Utils
import { screen, wrapper, userEvent } from '@/utils/testUtils';

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

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

jest.mock('@/context', () => ({
  ...jest.requireActual('@/context'),
  useCartContext: jest.fn(() => ({
    cartItems: [],
    addToCart: jest.fn(),
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
  const mockAddToCart = jest.fn();
  const mockAddToast = jest.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
    (useCartContext as jest.Mock).mockReturnValue({
      cartItems: [],
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

    const link = screen.getByRole('link');

    expect(link).toHaveAttribute('href', `${ROUTES.STORE}/${mockBook.id}`);
  });

  it('should handle add to cart action for normal user', async () => {
    wrapper(<BookCard {...defaultProps} />);

    const addToCartButton = screen.getByText('Order Today');
    await user.click(addToCartButton);

    expect(mockAddToCart).toHaveBeenCalledWith(mockBook, 1);
  });

  it('should not show order button for admin user', () => {
    wrapper(<BookCard {...defaultProps} isAdmin={true} />);

    const orderButton = screen.queryByText('Order Today');

    expect(orderButton).not.toBeInTheDocument();
  });

  it('should show out of stock when quantity is 0', () => {
    const outOfStockBook = { ...mockBook, quantity: 0 };

    wrapper(<BookCard {...defaultProps} bookData={outOfStockBook} />);

    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('Out of Stock');
    expect(button).toBeDisabled();
  });

  it('should handle delete book action', async () => {
    wrapper(<BookCard {...defaultProps} isAdmin={true} />);

    const deleteButton = screen.getByLabelText('Delete book button');
    await user.click(deleteButton);

    const confirmButton = screen.getByText('Confirm');
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

    const confirmButton = screen.getByText('Confirm');
    await user.click(confirmButton);

    expect(mockRouter.push).toHaveBeenCalledWith('/store?page=1');
  });

  it('should show correct available quantity when item exists in cart', () => {
    const cartQuantity = 3;

    (useCartContext as jest.Mock).mockReturnValue({
      cartItems: [{ ...mockBook, quantity: cartQuantity }],
      addToCart: mockAddToCart,
    });

    wrapper(<BookCard {...defaultProps} />);

    const button = screen.getByRole('button');

    expect(button).toBeEnabled();
    expect(button).toHaveTextContent('Order Today');
  });

  it('should show out of stock when cart quantity is 0', () => {
    (useCartContext as jest.Mock).mockReturnValue({
      cartItems: [{ ...mockBook, quantity: 0 }],
      addToCart: mockAddToCart,
    });

    wrapper(<BookCard {...defaultProps} />);

    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('Out of Stock');
    expect(button).toBeDisabled();
  });

  it('should not call addToCart when out of stock button is clicked', async () => {
    const outOfStockBook = { ...mockBook, quantity: 0 };

    wrapper(<BookCard {...defaultProps} bookData={outOfStockBook} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(mockAddToCart).not.toHaveBeenCalled();
  });

  it('should not call addToCart for admin user even if book is in stock', async () => {
    wrapper(<BookCard {...defaultProps} isAdmin={true} />);

    const orderButton = screen.queryByText('Order Today');

    expect(orderButton).not.toBeInTheDocument();
    expect(mockAddToCart).not.toHaveBeenCalled();
  });
});
