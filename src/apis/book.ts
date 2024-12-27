'use server';

// Constants
import { API_PATH, DEFAULT_BOOKS_PER_PAGE } from '@/constants';

// Types
import { TBooksResponse, TBookResponse } from '@/types';

// Services
import { httpClient } from '@/services';

// Utils
import { formatErrorMessage } from '@/utils';

const getBookList = async (
  page?: number,
  limit?: number,
): Promise<TBooksResponse> => {
  const endpoint = `${API_PATH.BOOKS}?page=${page}&limit=${limit || DEFAULT_BOOKS_PER_PAGE}`;

  try {
    const data = await httpClient.get<TBooksResponse>({
      endpoint,
    });

    return data;
  } catch (error) {
    return {
      error: formatErrorMessage(error),
    };
  }
};

const getBookById = async (id?: string): Promise<TBookResponse> => {
  const endpoint = `${API_PATH.BOOKS}?id=${id}`;

  try {
    const data = await httpClient.get<TBooksResponse>({
      endpoint,
    });

    return {
      book: data.books?.[0],
    };
  } catch (error) {
    return {
      error: formatErrorMessage(error),
    };
  }
};

export { getBookList, getBookById };
