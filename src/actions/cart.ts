'use server';

// Constants
import { API_PATH } from '@/constants';

// Services
import { httpClient, HttpMethod } from '@/services';

// Types
import { TCartResponse } from '@/types';

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

export { getCart };
