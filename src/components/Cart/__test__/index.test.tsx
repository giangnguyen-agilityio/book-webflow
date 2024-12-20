import { Navbar } from '@nextui-org/react';

// Utils
import { wrapper, screen, userEvent } from '@/utils/testUtils';

// Context
import { useCartContext } from '@/context';

// Components
import CartAction from '..';

jest.mock('@/context', () => ({
  ...jest.requireActual('@/context'),
  useCartContext: jest.fn(),
  useToast: () => ({ addToast: jest.fn() }),
}));

describe('CartAction component', () => {
  const mockOnPress = jest.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithNavbar = (children: React.ReactNode) => {
    return wrapper(<Navbar>{children}</Navbar>);
  };

  it('should renders cart button without quantity badge when cart is empty', () => {
    (useCartContext as jest.Mock).mockReturnValue({ cartItems: [] });

    renderWithNavbar(<CartAction onPress={mockOnPress} />);

    expect(screen.getByLabelText('Cart Button')).toBeInTheDocument();
    expect(screen.queryByText('00')).not.toBeInTheDocument();
  });

  it('should renders cart button with formatted quantity when items < 10', () => {
    (useCartContext as jest.Mock).mockReturnValue({
      cartItems: [{ id: 1 }, { id: 2 }],
    });

    renderWithNavbar(<CartAction onPress={mockOnPress} />);

    expect(screen.getByText('02')).toBeInTheDocument();
  });

  it('should renders cart button with quantity when items between 10 and 99', () => {
    (useCartContext as jest.Mock).mockReturnValue({
      cartItems: Array(15).fill({ id: 1 }),
    });

    renderWithNavbar(<CartAction onPress={mockOnPress} />);

    expect(screen.getByText('15')).toBeInTheDocument();
  });

  it('should renders cart button with 99+ when items exceed 99', () => {
    (useCartContext as jest.Mock).mockReturnValue({
      cartItems: Array(100).fill({ id: 1 }),
    });

    renderWithNavbar(<CartAction onPress={mockOnPress} />);

    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('should calls onPress when button is clicked', async () => {
    (useCartContext as jest.Mock).mockReturnValue({ cartItems: [] });

    renderWithNavbar(<CartAction onPress={mockOnPress} />);

    await user.click(screen.getByLabelText('Cart Button'));

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
