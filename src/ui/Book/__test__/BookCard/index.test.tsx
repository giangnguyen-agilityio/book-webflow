// Utils
import { screen, wrapper, userEvent } from '@/utils/testUtils';

// Constants
import { ROUTES } from '@/constants';

// Context
import { useCartContext, useToast } from '@/context';

// Components
import BookCard from '@/ui/Book/BookCard';

// Mock
import { MOCK_DEFAULT_BOOK_ITEM } from '@/mock';

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

const mockBook = MOCK_DEFAULT_BOOK_ITEM;

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

  it('should render correctly', () => {
    const { container } = wrapper(<BookCard bookData={mockBook} />);

    expect(container).toMatchSnapshot();
  });

  it('should navigate to book detail page when clicked', () => {
    wrapper(<BookCard bookData={mockBook} />);

    const link = screen.getByRole('link');

    expect(link).toHaveAttribute('href', `${ROUTES.STORE}/${mockBook.id}`);
  });

  it('should handle add to cart action', async () => {
    wrapper(<BookCard bookData={mockBook} />);
    const addToCartButton = screen.getByText('Order Today');

    await user.click(addToCartButton);

    expect(mockAddToCart).toHaveBeenCalledWith(mockBook, 1);
  });

  it('should show out of stock when quantity is 0', () => {
    const outOfStockBook = { ...mockBook, quantity: 0 };
    wrapper(<BookCard bookData={outOfStockBook} />);

    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('Out of Stock');
    expect(button).toBeDisabled();
  });

  it('should show correct available quantity when item exists in cart', () => {
    const cartQuantity = 3;
    (useCartContext as jest.Mock).mockReturnValue({
      cartItems: [{ ...mockBook, quantity: cartQuantity }],
      addToCart: mockAddToCart,
    });

    wrapper(<BookCard bookData={mockBook} />);

    const button = screen.getByRole('button');

    expect(button).toBeEnabled();
    expect(button).toHaveTextContent('Order Today');
  });

  it('should show out of stock when cart quantity is 0', () => {
    (useCartContext as jest.Mock).mockReturnValue({
      cartItems: [{ ...mockBook, quantity: 0 }],
      addToCart: mockAddToCart,
    });

    wrapper(<BookCard bookData={mockBook} />);

    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('Out of Stock');
    expect(button).toBeDisabled();
  });

  it('should not call addToCart when out of stock button is clicked', async () => {
    const outOfStockBook = { ...mockBook, quantity: 0 };
    wrapper(<BookCard bookData={outOfStockBook} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(mockAddToCart).not.toHaveBeenCalled();
  });
});
