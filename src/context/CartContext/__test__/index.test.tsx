// Utils
import { act, ignoredConsoleError, renderHook } from '@/utils/testUtils';

// Constants
import { CART_MESSAGES } from '@/constants';

// Mock
import { MOCK_DEFAULT_BOOK_ITEM } from '@/mock';

// Context
import { ToastType } from '@/context';

import { CartProvider, useCartContext } from '..';

const mockCartItem = {
  id: '1',
  bookId: '1',
  quantity: 1,
  book: MOCK_DEFAULT_BOOK_ITEM,
};

const mockUserId = 'userID';
const mockAddToast = jest.fn();

const mockHandleAddToCart = jest.fn().mockResolvedValue(true);
const mockHandleUpdateQuantity = jest.fn().mockResolvedValue(true);
const mockHandleRemoveFromCart = jest.fn().mockResolvedValue(true);
const mockHandleClearCart = jest.fn().mockResolvedValue(true);

jest.mock('@/hooks', () => ({
  useCart: () => ({
    items: [],
    isLoading: false,
    handleAddToCart: mockHandleAddToCart,
    handleUpdateQuantity: mockHandleUpdateQuantity,
    handleRemoveFromCart: mockHandleRemoveFromCart,
    handleClearCart: mockHandleClearCart,
  }),
}));

jest.mock('@/context', () => ({
  ...jest.requireActual('@/context'),
  useToast: () => ({
    addToast: mockAddToast,
  }),
  ToastType: {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
  },
}));

describe('CartContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should provide cart context with initial values', () => {
    const { result } = renderHook(() => useCartContext(), {
      wrapper: ({ children }) => (
        <CartProvider userId={mockUserId}>{children}</CartProvider>
      ),
    });

    expect(result.current.cartItems).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle addToCart successfully', async () => {
    const { result } = renderHook(() => useCartContext(), {
      wrapper: ({ children }) => (
        <CartProvider userId={mockUserId}>{children}</CartProvider>
      ),
    });

    await act(async () => {
      await result.current.addToCart(mockCartItem.bookId, 1);
    });

    expect(mockHandleAddToCart).toHaveBeenCalled();
    expect(mockAddToast).toHaveBeenCalledWith(
      CART_MESSAGES.ADD_SUCCESS,
      ToastType.SUCCESS,
    );
  });

  it('should handle removeFromCart successfully', async () => {
    const { result } = renderHook(() => useCartContext(), {
      wrapper: ({ children }) => (
        <CartProvider userId={mockUserId}>{children}</CartProvider>
      ),
    });

    await act(async () => {
      await result.current.removeFromCart(mockCartItem.id);
    });

    expect(mockHandleRemoveFromCart).toHaveBeenCalled();
    expect(mockAddToast).toHaveBeenCalledWith(
      CART_MESSAGES.REMOVE_SUCCESS,
      ToastType.SUCCESS,
    );
  });

  it('should handle updateQuantity successfully', async () => {
    const { result } = renderHook(() => useCartContext(), {
      wrapper: ({ children }) => (
        <CartProvider userId={mockUserId}>{children}</CartProvider>
      ),
    });

    await act(async () => {
      await result.current.updateQuantity(mockCartItem.id, '2');
    });

    expect(mockHandleUpdateQuantity).toHaveBeenCalled();
    expect(mockAddToast).toHaveBeenCalledWith(
      CART_MESSAGES.UPDATE_SUCCESS,
      ToastType.SUCCESS,
    );
  });

  it('should handle clearCart successfully', async () => {
    const { result } = renderHook(() => useCartContext(), {
      wrapper: ({ children }) => (
        <CartProvider userId={mockUserId}>{children}</CartProvider>
      ),
    });

    await act(async () => {
      await result.current.clearCart();
    });

    expect(mockHandleClearCart).toHaveBeenCalled();
    expect(mockAddToast).toHaveBeenCalledWith(
      CART_MESSAGES.CHECKOUT_SUCCESS,
      ToastType.SUCCESS,
    );
  });

  it('should throw error when useCartContext is used outside provider', () => {
    ignoredConsoleError();

    expect(() => renderHook(() => useCartContext())).toThrow(
      'useCartContext must be used within a CartProvider',
    );
  });
});
