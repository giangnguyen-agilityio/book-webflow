'use server';

// Constants
import { API_PATH } from '@/constants';

// Services
import { httpClient, HttpMethod } from '@/services';

// Types
import { TCartItemResponse, TCartResponse } from '@/types';

// Models
import { CartItem } from '@/models';

// Utils
import { formatErrorMessage } from '@/utils';

const getCart = async (authId: string): Promise<TCartResponse> => {
  try {
    const response = await httpClient.request<null, TCartResponse>({
      endpoint: `${API_PATH.AUTH}/${authId}/cart`,
      method: HttpMethod.GET,
    });

    return { cart: response.cart };
  } catch (error) {
    const errorMessage = formatErrorMessage(error);

    return {
      cart: [],
      ...(!errorMessage.toLowerCase().includes('not found') && {
        error: errorMessage,
      }),
    };
  }
};

export const addToCartAction = async (
  authId: string,
  cartItem: CartItem,
): Promise<TCartItemResponse> => {
  try {
    const response = await httpClient.request<CartItem, CartItem>({
      endpoint: `${API_PATH.AUTH}/${authId}/cart`,
      method: HttpMethod.POST,
      body: cartItem,
    });

    return {
      cart: response,
    };
  } catch (error) {
    return {
      cart: null,
      error: formatErrorMessage(error),
    };
  }
};

export const updateCartItem = async (
  authId: string,
  cartItem: CartItem,
): Promise<TCartItemResponse> => {
  try {
    const response = await httpClient.request<CartItem, CartItem>({
      endpoint: `${API_PATH.AUTH}/${authId}/cart/${cartItem.id}`,
      method: HttpMethod.PATCH,
      body: cartItem,
    });

    return {
      cart: response,
    };
  } catch (error) {
    return {
      cart: null,
      error: formatErrorMessage(error),
    };
  }
};

export { getCart };
