import { renderHook, act } from '@/utils/testUtils';

// Actions
import * as cartActions from '@/actions';
import * as bookApis from '@/apis';

// Constants
import { CART_MESSAGES } from '@/constants';

// Mock
import { MOCK_CART_ITEM, MOCK_DEFAULT_BOOK_ITEM, MOCK_USER_ID } from '@/mock';

// Hook
import { useCart } from '../..';

jest.mock('@/actions', () => ({
  ...jest.requireActual('@/actions'),
  getCart: jest.fn(),
  addItemToCart: jest.fn(),
  updateCartItem: jest.fn(),
  updateBook: jest.fn(),
  removeCartItem: jest.fn(),
  clearCartItems: jest.fn(),
}));

jest.mock('@/apis', () => ({
  ...jest.requireActual('@/apis'),
  getBookById: jest.fn(),
}));

// Mock context
const mockAddToast = jest.fn();
jest.mock('@/context', () => ({
  ...jest.requireActual('@/context'),
  useToast: () => ({ addToast: mockAddToast }),
  ToastType: {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
  },
}));

describe('useCart', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch cart items and validate against existing books', async () => {
    // Mock getCart response
    (cartActions.getCart as jest.Mock).mockResolvedValue({
      cart: [MOCK_CART_ITEM],
    });

    // Mock getBookById response
    (bookApis.getBookById as jest.Mock).mockResolvedValue({
      book: MOCK_DEFAULT_BOOK_ITEM,
    });

    const { result } = renderHook(() => useCart(MOCK_USER_ID));

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(cartActions.getCart).toHaveBeenCalledWith(MOCK_USER_ID);
    expect(bookApis.getBookById).toHaveBeenCalledWith(MOCK_CART_ITEM.bookId);
    expect(result.current.items).toEqual([MOCK_CART_ITEM]);
    expect(result.current.isLoading).toBe(false);
  });

  it('should remove cart items when corresponding book no longer exists', async () => {
    // Mock getCart response
    (cartActions.getCart as jest.Mock).mockResolvedValue({
      cart: [MOCK_CART_ITEM],
    });

    // Mock book not found
    (bookApis.getBookById as jest.Mock).mockResolvedValue({
      book: null,
    });

    const { result } = renderHook(() => useCart(MOCK_USER_ID));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(cartActions.removeCartItem).toHaveBeenCalledWith(
      MOCK_USER_ID,
      MOCK_CART_ITEM.id,
    );
    expect(result.current.items).toEqual([]);
  });

  it('should handle add to cart', async () => {
    (bookApis.getBookById as jest.Mock).mockResolvedValue({
      book: MOCK_DEFAULT_BOOK_ITEM,
    });
    (cartActions.addItemToCart as jest.Mock).mockResolvedValue({
      cart: [MOCK_CART_ITEM],
    });
    (cartActions.updateBook as jest.Mock).mockResolvedValue({ error: null });

    const { result } = renderHook(() => useCart(MOCK_USER_ID));

    let success;
    await act(async () => {
      success = await result.current.handleAddToCart(
        MOCK_DEFAULT_BOOK_ITEM.id,
        1,
      );
    });

    expect(success).toBe(true);
    expect(cartActions.addItemToCart).toHaveBeenCalled();
    expect(cartActions.updateBook).toHaveBeenCalled();
  });

  // Error cases
  it('should handle fetch cart error', async () => {
    const error = 'Failed to fetch cart';
    (cartActions.getCart as jest.Mock).mockResolvedValue({ error });

    renderHook(() => useCart(MOCK_USER_ID));
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(mockAddToast).toHaveBeenCalledWith(error, 'error');
  });

  it('should handle add to cart validation errors', async () => {
    (bookApis.getBookById as jest.Mock).mockResolvedValue({
      book: MOCK_DEFAULT_BOOK_ITEM,
    });

    const { result } = renderHook(() => useCart(MOCK_USER_ID));

    let success;
    await act(async () => {
      success = await result.current.handleAddToCart(
        MOCK_DEFAULT_BOOK_ITEM.id,
        MOCK_DEFAULT_BOOK_ITEM.quantity + 1,
      );
    });

    expect(success).toBe(false);
    expect(mockAddToast).toHaveBeenCalledWith(
      CART_MESSAGES.EXCEED_STOCK,
      'error',
    );
  });

  it('should handle update quantity validation errors', async () => {
    const { result } = renderHook(() => useCart(MOCK_USER_ID));

    act(() => {
      result.current.items.push(MOCK_CART_ITEM);
    });

    let success;
    await act(async () => {
      success = await result.current.handleUpdateQuantity(
        MOCK_CART_ITEM.id,
        '0',
      );
    });

    expect(success).toBe(false);
  });
});
