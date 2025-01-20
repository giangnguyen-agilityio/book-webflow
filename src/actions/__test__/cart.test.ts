// Actions
import {
  getCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCartItems,
} from '@/actions';

// Constants
import { API_PATH } from '@/constants';

// Mock
import { MOCK_CART_ITEM, MOCK_USER_ID } from '@/mock';

// Services
import { httpClient, HttpMethod } from '@/services';

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

jest.mock('@/services', () => ({
  httpClient: {
    request: jest.fn(),
  },
  HttpMethod: {
    GET: 'GET',
    POST: 'POST',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
  },
}));

jest.mock('@/utils', () => ({
  formatErrorMessage: jest.fn((error) => {
    if (error.message.toLowerCase().includes('not found')) {
      return 'not found';
    }
    return 'Error message';
  }),
}));

describe('Cart Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCart', () => {
    it('should get cart successfully', async () => {
      const mockCart = [MOCK_CART_ITEM];
      (httpClient.request as jest.Mock).mockResolvedValueOnce({
        cart: mockCart,
      });

      const result = await getCart(MOCK_USER_ID);

      expect(httpClient.request).toHaveBeenCalledWith({
        endpoint: `${API_PATH.AUTH}/${MOCK_USER_ID}/cart`,
        method: HttpMethod.GET,
      });
      expect(result).toEqual({ cart: mockCart });
    });

    it('should handle not found error without returning error message', async () => {
      (httpClient.request as jest.Mock).mockRejectedValueOnce(
        new Error('not found'),
      );

      const result = await getCart(MOCK_USER_ID);

      expect(result).toEqual({ cart: [] });
    });

    it('should handle other errors', async () => {
      (httpClient.request as jest.Mock).mockRejectedValueOnce(
        new Error('network error'),
      );

      const result = await getCart(MOCK_USER_ID);

      expect(result).toEqual({ cart: [], error: 'Error message' });
    });
  });

  describe('addItemToCart', () => {
    it('should add item to cart successfully', async () => {
      (httpClient.request as jest.Mock).mockResolvedValueOnce(MOCK_CART_ITEM);

      const result = await addItemToCart(MOCK_USER_ID, MOCK_CART_ITEM);

      expect(httpClient.request).toHaveBeenCalledWith({
        endpoint: `${API_PATH.AUTH}/${MOCK_USER_ID}/cart`,
        method: HttpMethod.POST,
        body: MOCK_CART_ITEM,
      });
      expect(result).toEqual({ cart: MOCK_CART_ITEM });
    });

    it('should handle error when adding item', async () => {
      (httpClient.request as jest.Mock).mockRejectedValueOnce(new Error());

      const result = await addItemToCart(MOCK_USER_ID, MOCK_CART_ITEM);

      expect(result).toEqual({ cart: null, error: 'Error message' });
    });
  });

  describe('updateCartItem', () => {
    it('should update cart item successfully', async () => {
      (httpClient.request as jest.Mock).mockResolvedValueOnce(MOCK_CART_ITEM);

      const result = await updateCartItem(MOCK_USER_ID, MOCK_CART_ITEM);

      expect(httpClient.request).toHaveBeenCalledWith({
        endpoint: `${API_PATH.AUTH}/${MOCK_USER_ID}/cart/${MOCK_CART_ITEM.id}`,
        method: HttpMethod.PATCH,
        body: MOCK_CART_ITEM,
      });
      expect(result).toEqual({ cart: MOCK_CART_ITEM });
    });

    it('should handle error when updating item', async () => {
      (httpClient.request as jest.Mock).mockRejectedValueOnce(new Error());

      const result = await updateCartItem(MOCK_USER_ID, MOCK_CART_ITEM);

      expect(result).toEqual({ cart: null, error: 'Error message' });
    });
  });

  describe('removeCartItem', () => {
    it('should remove cart item successfully', async () => {
      (httpClient.request as jest.Mock).mockResolvedValueOnce({});

      const result = await removeCartItem(MOCK_USER_ID, MOCK_CART_ITEM.id);

      expect(httpClient.request).toHaveBeenCalledWith({
        endpoint: `${API_PATH.AUTH}/${MOCK_USER_ID}/cart/${MOCK_CART_ITEM.id}`,
        method: HttpMethod.DELETE,
      });
      expect(result).toEqual({ success: true });
    });

    it('should handle error when removing item', async () => {
      (httpClient.request as jest.Mock).mockRejectedValueOnce(new Error());

      const result = await removeCartItem(MOCK_USER_ID, MOCK_CART_ITEM.id);

      expect(result).toEqual({ success: false, error: 'Error message' });
    });
  });

  describe('clearCartItems', () => {
    const mockCartItems = [MOCK_CART_ITEM, { ...MOCK_CART_ITEM, id: '2' }];

    it('should clear all cart items successfully', async () => {
      (httpClient.request as jest.Mock).mockResolvedValue({});

      const result = await clearCartItems(MOCK_USER_ID, mockCartItems);

      expect(httpClient.request).toHaveBeenCalledTimes(mockCartItems.length);
      mockCartItems.forEach((item) => {
        expect(httpClient.request).toHaveBeenCalledWith({
          endpoint: `${API_PATH.AUTH}/${MOCK_USER_ID}/cart/${item.id}`,
          method: HttpMethod.DELETE,
        });
      });
      expect(result).toEqual({ success: true });
    });

    it('should handle error when clearing items', async () => {
      (httpClient.request as jest.Mock).mockRejectedValueOnce(new Error());

      const result = await clearCartItems(MOCK_USER_ID, mockCartItems);

      expect(result).toEqual({ success: false, error: 'Error message' });
    });
  });
});
