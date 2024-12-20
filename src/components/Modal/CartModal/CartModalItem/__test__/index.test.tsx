// Mock
import { MOCK_DEFAULT_CART_ITEMS } from '@/mock';

// Utils
import { screen, wrapper, userEvent } from '@/utils/testUtils';

// Components
import CartModalItem from '..';

describe('CartModalItem component', () => {
  const mockItem = MOCK_DEFAULT_CART_ITEMS[0];

  const defaultProps = {
    item: mockItem,
    showDivider: true,
    onQuantityChange: jest.fn(),
    onRemoveClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with all required props', () => {
    const { container } = wrapper(<CartModalItem {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should handle quantity change', async () => {
    const user = userEvent.setup();
    wrapper(<CartModalItem {...defaultProps} />);

    const input = screen.getByRole('spinbutton');
    await user.clear(input);
    await user.type(input, '5');

    expect(defaultProps.onQuantityChange).toHaveBeenCalled();
  });

  it('should handle remove click', async () => {
    const user = userEvent.setup();
    wrapper(<CartModalItem {...defaultProps} />);

    const removeButton = screen.getByRole('button', { name: /remove/i });
    await user.click(removeButton);

    expect(defaultProps.onRemoveClick).toHaveBeenCalledWith('1');
  });

  it('should show low stock warning when quantity is less than 5', () => {
    const lowStockItem = {
      ...mockItem,
      quantity: 3,
    };

    wrapper(<CartModalItem {...defaultProps} item={lowStockItem} />);

    const stockText = screen.getByText('Only 3 left in stock');

    expect(stockText).toHaveClass('text-text-error');
  });

  it('should not show divider when showDivider is false', () => {
    const { container } = wrapper(
      <CartModalItem {...defaultProps} showDivider={false} />,
    );

    expect(container.querySelector('.bg-blue-150')).not.toBeInTheDocument();
  });

  it('should limit quantity input to remaining stock', () => {
    wrapper(<CartModalItem {...defaultProps} />);

    const input = screen.getByRole('spinbutton');

    expect(input).toHaveAttribute('max', '12'); // quantity + orderedQuantity
    expect(input).toHaveAttribute('min', '1');
  });
});
