// Utils
import { act, ignoredConsoleError, renderHook } from '@/utils/testUtils';

// Models
import { Book } from '@/models';

// Mock
import { MOCK_DEFAULT_BOOK_ITEM } from '@/mock';

// Context
import { CartProvider, useCartContext } from '..';

// Mock getCart API
jest.mock('@/actions', () => ({
  ...jest.requireActual('@/actions'),
  getCart: jest.fn(),
}));

jest.mock('@/context', () => ({
  useToast: () => ({
    addToast: jest.fn(),
  }),
}));

const mockBook: Book = MOCK_DEFAULT_BOOK_ITEM;

describe('CartContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with empty cart', () => {
    const { result } = renderHook(() => useCartContext(), {
      wrapper: ({ children }) => <CartProvider>{children}</CartProvider>,
    });

    expect(result.current.cartItems).toHaveLength(0);
  });

  it('should add item to cart', () => {
    const { result } = renderHook(() => useCartContext(), {
      wrapper: ({ children }) => <CartProvider>{children}</CartProvider>,
    });

    act(() => {
      result.current.addToCart(mockBook, 2);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0]).toEqual({
      ...mockBook,
      orderedQuantity: 2,
      quantity: mockBook.quantity - 2,
    });
  });

  it('should update quantity if item already exists in cart', () => {
    const { result } = renderHook(() => useCartContext(), {
      wrapper: ({ children }) => <CartProvider>{children}</CartProvider>,
    });

    act(() => {
      result.current.addToCart(mockBook, 1);
    });
    act(() => {
      result.current.addToCart(mockBook, 2);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].orderedQuantity).toBe(3);
  });

  it('should not add item if quantity exceeds stock', () => {
    const { result } = renderHook(() => useCartContext(), {
      wrapper: ({ children }) => <CartProvider>{children}</CartProvider>,
    });

    act(() => {
      result.current.addToCart({ ...mockBook, quantity: 5 }, 6);
    });

    expect(result.current.cartItems).toHaveLength(0);
  });

  it('should remove item from cart', () => {
    const { result } = renderHook(() => useCartContext(), {
      wrapper: ({ children }) => <CartProvider>{children}</CartProvider>,
    });

    act(() => {
      result.current.addToCart(mockBook, 2);
    });

    act(() => {
      result.current.removeFromCart(mockBook.id || '');
    });

    expect(result.current.cartItems).toHaveLength(0);
  });

  it('should update item quantity', () => {
    const { result } = renderHook(() => useCartContext(), {
      wrapper: ({ children }) => <CartProvider>{children}</CartProvider>,
    });

    act(() => {
      result.current.addToCart(mockBook, 2);
      result.current.updateQuantity(mockBook.id || '', 3);
    });

    expect(result.current.cartItems[0].orderedQuantity).toBe(3);
  });

  it('should clear cart', () => {
    const { result } = renderHook(() => useCartContext(), {
      wrapper: ({ children }) => <CartProvider>{children}</CartProvider>,
    });

    act(() => {
      result.current.addToCart(mockBook, 2);
      result.current.clearCart();
    });

    expect(result.current.cartItems).toHaveLength(0);
  });

  it('should throw error when useCartContext is used outside provider', () => {
    ignoredConsoleError();

    expect(() => renderHook(() => useCartContext())).toThrow(
      'useCartContext must be used within a CartProvider',
    );
  });
});
