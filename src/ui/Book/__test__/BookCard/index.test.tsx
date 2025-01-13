// Utils
import { screen, wrapper, userEvent } from '@/utils/testUtils';

// Constants
import { ROUTES } from '@/constants';

// Context
import { useCartContext, useToast } from '@/context';

// Mock
import { MOCK_DEFAULT_BOOK_ITEM } from '@/mock';

// Components
import { BookCard } from '@/ui';

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

  it('should render correctly for normal user', () => {
    const { container } = wrapper(
      <BookCard bookData={mockBook} isAdmin={false} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly for admin user', () => {
    const { container } = wrapper(
      <BookCard bookData={mockBook} isAdmin={true} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should navigate to book detail page when clicked', () => {
    wrapper(<BookCard bookData={mockBook} isAdmin={false} />);

    const link = screen.getByRole('link');

    expect(link).toHaveAttribute('href', `${ROUTES.STORE}/${mockBook.id}`);
  });

  it('should handle add to cart action for normal user', async () => {
    wrapper(<BookCard bookData={mockBook} isAdmin={false} />);

    const addToCartButton = screen.getByText('Order Today');

    await user.click(addToCartButton);

    expect(mockAddToCart).toHaveBeenCalledWith(mockBook, 1);
  });

  it('should not show order button for admin user', () => {
    wrapper(<BookCard bookData={mockBook} isAdmin={true} />);

    const orderButton = screen.queryByText('Order Today');

    expect(orderButton).not.toBeInTheDocument();
  });

  it('should show out of stock when quantity is 0', () => {
    const outOfStockBook = { ...mockBook, quantity: 0 };

    wrapper(<BookCard bookData={outOfStockBook} isAdmin={false} />);

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

    wrapper(<BookCard bookData={mockBook} isAdmin={false} />);

    const button = screen.getByRole('button');

    expect(button).toBeEnabled();
    expect(button).toHaveTextContent('Order Today');
  });

  it('should show out of stock when cart quantity is 0', () => {
    (useCartContext as jest.Mock).mockReturnValue({
      cartItems: [{ ...mockBook, quantity: 0 }],
      addToCart: mockAddToCart,
    });

    wrapper(<BookCard bookData={mockBook} isAdmin={false} />);

    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('Out of Stock');
    expect(button).toBeDisabled();
  });

  it('should not call addToCart when out of stock button is clicked', async () => {
    const outOfStockBook = { ...mockBook, quantity: 0 };

    wrapper(<BookCard bookData={outOfStockBook} isAdmin={false} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(mockAddToCart).not.toHaveBeenCalled();
  });

  it('should not call addToCart for admin user even if book is in stock', async () => {
    wrapper(<BookCard bookData={mockBook} isAdmin={true} />);

    // Verify order button is not present
    const orderButton = screen.queryByText('Order Today');

    expect(orderButton).not.toBeInTheDocument();

    // Verify addToCart was never called
    expect(mockAddToCart).not.toHaveBeenCalled();
  });
});
