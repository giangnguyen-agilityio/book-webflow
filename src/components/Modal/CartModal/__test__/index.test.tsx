// Utils
import {
  screen,
  wrapper,
  userEvent,
  ignoredConsoleError,
  waitFor,
} from '@/utils/testUtils';

// Constants
import { CART_MESSAGES } from '@/constants';

// Mocks
import { MOCK_DEFAULT_CART_ITEMS } from '@/mock';

// Components
import CartModal from '..';

describe('CartModal component', () => {
  const defaultProps = {
    isOpen: true,
    isLoading: false,
    onClose: jest.fn(),
    onRemoveItem: jest.fn(),
    onUpdateQuantity: jest.fn(),
    onCheckout: jest.fn(),
    cartItems: MOCK_DEFAULT_CART_ITEMS,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    ignoredConsoleError();
  });

  it('should render cart with items', () => {
    wrapper(<CartModal {...defaultProps} />);

    expect(screen.getByText('Your Cart')).toBeInTheDocument();
    expect(
      screen.getByText(MOCK_DEFAULT_CART_ITEMS[0].title),
    ).toBeInTheDocument();
    expect(screen.getByText('$69.97 USD')).toBeInTheDocument(); // (19.99 * 2) + (29.99 * 1)
  });

  it('should render empty cart message when no items', () => {
    wrapper(<CartModal {...defaultProps} cartItems={[]} />);

    expect(screen.getByText(/haven't added any items/i)).toBeInTheDocument();
    expect(screen.getByText('Continue Shopping')).toBeInTheDocument();
  });

  it('should handle item quantity update', async () => {
    const user = userEvent.setup();
    wrapper(<CartModal {...defaultProps} />);

    const quantityInput = screen.getByRole('spinbutton', {
      name: new RegExp(`Quantity for ${MOCK_DEFAULT_CART_ITEMS[0].title}`, 'i'),
    });

    await user.clear(quantityInput);
    await user.type(quantityInput, '3');
    await quantityInput.blur();

    await waitFor(() => {
      expect(defaultProps.onUpdateQuantity).toHaveBeenCalledWith(
        MOCK_DEFAULT_CART_ITEMS[0].id,
        '3',
      );
    });
  });

  it('should handle item removal', async () => {
    const user = userEvent.setup();
    wrapper(<CartModal {...defaultProps} />);

    const removeButton = screen.getAllByRole('button', { name: /remove/i })[0];
    await user.click(removeButton);

    // Confirm modal should appear
    expect(screen.getByText(CART_MESSAGES.REMOVE_TITLE)).toBeInTheDocument();

    // Confirm removal
    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    await user.click(confirmButton);

    expect(defaultProps.onRemoveItem).toHaveBeenCalledWith(
      MOCK_DEFAULT_CART_ITEMS[0].id,
    );
  });

  it('should handle checkout', async () => {
    const user = userEvent.setup();
    wrapper(<CartModal {...defaultProps} />);

    const checkoutButton = screen.getByRole('button', {
      name: /continue to checkout/i,
    });
    await user.click(checkoutButton);

    expect(defaultProps.onCheckout).toHaveBeenCalled();
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('should calculate correct subtotal', () => {
    const items = [
      { ...MOCK_DEFAULT_CART_ITEMS[0], price: 10, orderedQuantity: 2 },
      { ...MOCK_DEFAULT_CART_ITEMS[1], price: 20, orderedQuantity: 1 },
    ];

    wrapper(<CartModal {...defaultProps} cartItems={items} />);

    // Subtotal should be (10 * 2) + (20 * 1) = 40
    expect(screen.getByText('$40.00 USD')).toBeInTheDocument();
  });

  it('should not close modal when isLoading is true', async () => {
    const user = userEvent.setup();
    wrapper(<CartModal {...defaultProps} isLoading={true} />);

    const closeButton = screen.getByRole('button', { name: /close cart/i });
    await user.click(closeButton);

    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });

  it('should close modal when isLoading is false', async () => {
    const user = userEvent.setup();
    wrapper(<CartModal {...defaultProps} isLoading={false} />);

    const closeButton = screen.getByRole('button', { name: /close cart/i });
    await user.click(closeButton);

    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('should cancel item removal', async () => {
    const user = userEvent.setup();
    wrapper(<CartModal {...defaultProps} />);

    // Click remove button
    const removeButton = screen.getAllByRole('button', { name: /remove/i })[0];
    await user.click(removeButton);

    // Click cancel in confirm modal
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    expect(defaultProps.onRemoveItem).not.toHaveBeenCalled();
  });
});
