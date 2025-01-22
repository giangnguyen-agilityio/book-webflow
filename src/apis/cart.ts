'use server';

import { revalidateTag } from 'next/cache';

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
      config: {
        next: {
          tags: [API_PATH.CART],
        },
      },
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

const addItemToCart = async (
  authId: string,
  cartItem: CartItem,
): Promise<TCartItemResponse> => {
  try {
    const response = await httpClient.request<CartItem, CartItem>({
      endpoint: `${API_PATH.AUTH}/${authId}/cart`,
      method: HttpMethod.POST,
      body: cartItem,
    });

    revalidateTag(API_PATH.CART);
    revalidateTag(API_PATH.BOOKS);

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

const updateCartItem = async (
  authId: string,
  cartItem: CartItem,
): Promise<TCartItemResponse> => {
  try {
    const response = await httpClient.request<CartItem, CartItem>({
      endpoint: `${API_PATH.AUTH}/${authId}/cart/${cartItem.id}`,
      method: HttpMethod.PATCH,
      body: cartItem,
    });

    revalidateTag(API_PATH.CART);
    revalidateTag(API_PATH.BOOKS);

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

const removeCartItem = async (authId: string, cartItemId: string) => {
  try {
    await httpClient.request<CartItem, CartItem>({
      endpoint: `${API_PATH.AUTH}/${authId}/cart/${cartItemId}`,
      method: HttpMethod.DELETE,
    });

    revalidateTag(API_PATH.CART);
    revalidateTag(API_PATH.BOOKS);

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: formatErrorMessage(error),
    };
  }
};

// Because the MockAPI.io not support clear all items so we need to delete each item in cart
const clearCartItems = async (authId: string, cartItems: CartItem[]) => {
  try {
    await Promise.all(
      cartItems.map((item) =>
        httpClient.request<CartItem, CartItem>({
          endpoint: `${API_PATH.AUTH}/${authId}/cart/${item.id}`,
          method: HttpMethod.DELETE,
        }),
      ),
    );

    revalidateTag(API_PATH.CART);
    revalidateTag(API_PATH.BOOKS);

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: formatErrorMessage(error),
    };
  }
};

export {
  getCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCartItems,
};
