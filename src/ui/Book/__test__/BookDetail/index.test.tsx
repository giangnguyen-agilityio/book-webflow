// Utils
import { screen, wrapper, userEvent } from '@/utils/testUtils';

// Context
import { useCartContext, useToast } from '@/context';

// Mock
import { MOCK_DEFAULT_BOOK_ITEM } from '@/mock';

// Components
import { BookDetail } from '@/ui';

const mockRouter = {
  back: jest.fn(),
};

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => mockRouter,
  usePathname: () => '/store/1',
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

const mockBook = MOCK_DEFAULT_BOOK_ITEM;

describe('BookDetail component', () => {
  const mockAddToCart = jest.fn();
  const mockAddToast = jest.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
    (useCartContext as jest.Mock).mockReturnValue({
      cartItems: [],
      isLoading: false,
      addToCart: mockAddToCart,
    });
    (useToast as jest.Mock).mockReturnValue({
      addToast: mockAddToast,
    });
  });

  it('should render book details correctly', () => {
    const { container } = wrapper(
      <BookDetail data={mockBook} isAdmin={false} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should handle quantity change correctly', async () => {
    wrapper(<BookDetail data={mockBook} isAdmin={false} />);

    const quantityInput = screen.getByLabelText(
      `Quantity for ${mockBook.title}`,
    );
    await user.clear(quantityInput);
    await user.type(quantityInput, '3');

    expect(quantityInput).toHaveValue(3);
  });

  it('should prevent quantity from going below 1', async () => {
    wrapper(<BookDetail data={mockBook} isAdmin={false} />);

    const quantityInput = screen.getByLabelText(
      `Quantity for ${mockBook.title}`,
    );
    await user.clear(quantityInput);
    await user.type(quantityInput, '0');

    expect(quantityInput).toHaveValue(1);
  });

  it('should handle add to cart with correct quantity', async () => {
    wrapper(<BookDetail data={mockBook} isAdmin={false} />);

    const quantityInput = screen.getByLabelText(
      `Quantity for ${mockBook.title}`,
    );
    await user.clear(quantityInput);
    await user.type(quantityInput, '3');

    const addToCartButton = screen.getByRole('button', {
      name: /add to cart/i,
    });
    await user.click(addToCartButton);

    expect(mockAddToCart).toHaveBeenCalledWith(mockBook.id, 3);
  });

  it('should disable add to cart when loading', () => {
    (useCartContext as jest.Mock).mockReturnValue({
      cartItems: [],
      isLoading: true,
      addToCart: mockAddToCart,
    });

    wrapper(<BookDetail data={mockBook} isAdmin={false} />);

    const addToCartButton = screen.getByRole('button', {
      name: /add to cart/i,
    });
    expect(addToCartButton).toBeDisabled();
  });

  it('should show correct inventory status for low stock', () => {
    const lowStockBook = { ...mockBook, quantity: 3 };
    wrapper(<BookDetail data={lowStockBook} isAdmin={false} />);

    expect(
      screen.getByText('Only 3 copies left! Order soon'),
    ).toBeInTheDocument();
  });

  it('should show correct inventory status for out of stock', () => {
    const outOfStockBook = { ...mockBook, quantity: 0 };
    wrapper(<BookDetail data={outOfStockBook} isAdmin={false} />);

    expect(
      screen.getByText('Out of stock - Check back later'),
    ).toBeInTheDocument();
  });

  it('should calculate available quantity based on cart items', () => {
    const cartQuantity = 10;
    (useCartContext as jest.Mock).mockReturnValue({
      cartItems: [{ bookId: mockBook.id, quantity: cartQuantity }],
      isLoading: false,
      addToCart: mockAddToCart,
    });

    wrapper(<BookDetail data={mockBook} isAdmin={false} />);

    const quantityInput = screen.getByLabelText(
      `Quantity for ${mockBook.title}`,
    );
    expect(quantityInput).toHaveValue(1);
    expect(
      screen.getByText('In Stock - Usually ships within 1-2 business days'),
    ).toBeInTheDocument();
  });

  it('should handle back navigation', async () => {
    wrapper(<BookDetail data={mockBook} isAdmin={false} />);

    const backButton = screen.getByRole('button', { name: /back/i });
    await user.click(backButton);

    expect(mockRouter.back).toHaveBeenCalled();
  });

  it('should not show order section for admin users', () => {
    wrapper(<BookDetail data={mockBook} isAdmin={true} />);

    expect(
      screen.queryByRole('button', { name: /add to cart/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(`Quantity for ${mockBook.title}`),
    ).not.toBeInTheDocument();
  });

  it('should show order section for non-admin users', () => {
    wrapper(<BookDetail data={mockBook} isAdmin={false} />);

    expect(
      screen.getByRole('button', { name: /add to cart/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(`Quantity for ${mockBook.title}`),
    ).toBeInTheDocument();
  });
});
