// Utils
import { screen, wrapper, userEvent } from '@/utils/testUtils';

// Context
import { useCartContext, useToast } from '@/context';

// Components
import { BookDetail } from '@/ui';

// Mock
import { MOCK_DEFAULT_BOOK_ITEM } from '@/mock';

const mockRouter = {
  back: jest.fn(),
};

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => mockRouter,
  usePathname: () => '/store/1',
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

const mockBook = MOCK_DEFAULT_BOOK_ITEM;

describe('BookDetail component', () => {
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
    const { container } = wrapper(<BookDetail data={mockBook} />);

    expect(container).toMatchSnapshot();
  });

  it('should handle add to cart action', async () => {
    wrapper(<BookDetail data={mockBook} />);

    const addToCartButton = screen.getByRole('button', {
      name: /add to cart/i,
    });

    await user.click(addToCartButton);

    expect(mockAddToCart).toHaveBeenCalledWith(mockBook, 1);
  });

  it('should display publisher without published date when date is not provided', () => {
    const bookWithoutDate = {
      ...mockBook,
      bookInformation: {
        ...mockBook.bookInformation,
        publishedDate: '',
      },
    };

    wrapper(<BookDetail data={bookWithoutDate} />);

    expect(screen.getByText('Publisher:')).toBeInTheDocument();
    expect(
      screen.getByText(bookWithoutDate.bookInformation.publisher),
    ).toBeInTheDocument();
    expect(screen.queryByText(/\(\d+\)/)).not.toBeInTheDocument();
  });

  it('should handle back navigation', async () => {
    wrapper(<BookDetail data={mockBook} />);

    const backButton = screen.getByRole('button', { name: /back/i });
    await user.click(backButton);

    expect(mockRouter.back).toHaveBeenCalled();
  });

  it('should handle quantity change within available limit', async () => {
    wrapper(<BookDetail data={mockBook} />);

    const quantityInput = screen.getByLabelText(
      `Quantity for ${mockBook.title}`,
    );
    await user.clear(quantityInput);
    await user.type(quantityInput, '5');

    expect(quantityInput).toHaveValue(5);
  });

  it('should limit quantity to available stock', async () => {
    const bookWithLimitedStock = { ...mockBook, quantity: 3 };
    wrapper(<BookDetail data={bookWithLimitedStock} />);

    const quantityInput = screen.getByLabelText(
      `Quantity for ${mockBook.title}`,
    );
    await user.clear(quantityInput);
    await user.type(quantityInput, '5');

    expect(quantityInput).toHaveValue(3);
  });

  it('should show out of stock state when quantity is 0', () => {
    const outOfStockBook = { ...mockBook, quantity: 0 };
    wrapper(<BookDetail data={outOfStockBook} />);

    const addToCartButton = screen.getByRole('button', {
      name: /out of stock/i,
    });
    const quantityInput = screen.getByLabelText(
      `Quantity for ${mockBook.title}`,
    );

    expect(addToCartButton).toBeDisabled();
    expect(quantityInput).toBeDisabled();
    expect(quantityInput).toHaveValue(0);
  });

  it('should use cart item quantity when book exists in cart', async () => {
    const cartQuantity = 2;
    (useCartContext as jest.Mock).mockReturnValue({
      cartItems: [{ ...mockBook, quantity: cartQuantity }],
      addToCart: mockAddToCart,
    });

    wrapper(<BookDetail data={mockBook} />);

    const quantityInput = screen.getByLabelText(
      `Quantity for ${mockBook.title}`,
    );
    await user.clear(quantityInput);
    await user.type(quantityInput, '5');

    expect(quantityInput).toHaveValue(cartQuantity);
  });
});
