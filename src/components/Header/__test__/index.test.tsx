// Utils
import {
  screen,
  wrapper,
  userEvent,
  ignoredConsoleError,
} from '@/utils/testUtils';

// Constants
import { ROUTES, SOCIAL_LINK_ITEMS } from '@/constants';

// Context
import { useCartContext } from '@/context';

// Mock
import { MOCK_DEFAULT_CART_ITEMS } from '@/mock';

// Components
import Header from '..';

jest.mock('@/context', () => ({
  ...jest.requireActual('@/context'),
  useCartContext: jest.fn(),
  useToast: () => ({ addToast: jest.fn() }),
}));

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));
jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
}));

describe('Header component', () => {
  const user = userEvent.setup();

  const mockCartContext = {
    cartItems: [],
    removeFromCart: jest.fn(),
    updateQuantity: jest.fn(),
    clearCart: jest.fn(),
  };

  beforeEach(() => {
    (useCartContext as jest.Mock).mockReturnValue(mockCartContext);
    ignoredConsoleError();
  });

  it('should render correctly', () => {
    const { container } = wrapper(<Header />);

    expect(container).toMatchSnapshot();
  });

  it('should render logo with correct link', () => {
    wrapper(<Header />);

    const logoLink = screen.getByLabelText(/Logo Icon/i)?.closest('a');

    expect(logoLink).toHaveAttribute('href', ROUTES.STORE);
  });

  it('should render social media links correctly', () => {
    wrapper(<Header />);

    const socialLinks = SOCIAL_LINK_ITEMS.slice(0, -1);
    socialLinks.forEach(({ title, url }) => {
      const link = screen.getByTitle(title);

      expect(link).toHaveAttribute('href', url);
    });
  });

  it('should toggle menu when hamburger button is clicked', async () => {
    wrapper(<Header />);

    const menuButton = screen.getByLabelText('Open menu');
    await user.click(menuButton);

    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
  });

  it('should open cart modal when cart button is clicked', async () => {
    wrapper(<Header />);

    const cartButton = screen.getByLabelText('Cart Button');
    await user.click(cartButton);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should close cart modal when close button is clicked', async () => {
    wrapper(<Header />);

    // Open cart modal
    const cartButton = screen.getByLabelText('Cart Button');
    await user.click(cartButton);

    // Verify modal exists before attempting to close
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    // Close cart modal
    const closeButton = screen.getByLabelText('Close cart');
    await user.click(closeButton);

    // Wait for modal to disappear
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should handle cart operations correctly', async () => {
    const cartItems = MOCK_DEFAULT_CART_ITEMS;
    (useCartContext as jest.Mock).mockReturnValue({
      ...mockCartContext,
      cartItems,
    });

    wrapper(<Header />);

    // Open cart modal
    await user.click(screen.getByLabelText('Cart Button'));

    // Clear cart
    const checkoutButton = screen.getByText(/Checkout/i);
    await user.click(checkoutButton);

    expect(mockCartContext.clearCart).toHaveBeenCalled();
  });
});
