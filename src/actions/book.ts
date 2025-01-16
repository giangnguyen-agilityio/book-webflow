'use server';

// Constants
import { API_PATH } from '@/constants';

// Types
import { TBookResponse } from '@/types';

// Services
import { httpClient, HttpMethod } from '@/services';

// Models
import { Book } from '@/models';

// Utils
import { formatErrorMessage } from '@/utils';

const createNewBook = async (data: Book): Promise<TBookResponse> => {
  try {
    const response = await httpClient.request<Book, TBookResponse>({
      endpoint: API_PATH.BOOKS,
      method: HttpMethod.POST,
      body: data,
    });

    return {
      book: response.book,
    };
  } catch (error) {
    return {
      error: formatErrorMessage(error),
    };
  }
};

export { createNewBook };
