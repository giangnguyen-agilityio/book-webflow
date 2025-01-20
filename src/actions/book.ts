'use server';

import { revalidatePath } from 'next/cache';

// Constants
import { API_PATH, ROUTES } from '@/constants';

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

    revalidatePath(ROUTES.STORE);

    return {
      book: response.book,
    };
  } catch (error) {
    return {
      error: formatErrorMessage(error),
    };
  }
};

const updateBook = async (data: Book): Promise<TBookResponse> => {
  try {
    const response = await httpClient.request<Book, TBookResponse>({
      endpoint: `${API_PATH.BOOKS}/${data.id}`,
      method: HttpMethod.PUT,
      body: data,
    });

    revalidatePath(ROUTES.STORE);

    return {
      book: response.book,
    };
  } catch (error) {
    return {
      error: formatErrorMessage(error),
    };
  }
};

const deleteBook = async (bookId: string): Promise<TBookResponse> => {
  try {
    const response = await httpClient.request<null, TBookResponse>({
      endpoint: `${API_PATH.BOOKS}/${bookId}`,
      method: HttpMethod.DELETE,
    });

    revalidatePath(ROUTES.STORE);

    return {
      book: response.book,
    };
  } catch (error) {
    return {
      error: formatErrorMessage(error),
    };
  }
};

export { createNewBook, updateBook, deleteBook };
