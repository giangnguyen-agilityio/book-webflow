'use server';

import { revalidateTag } from 'next/cache';

// Constants
import { API_PATH, DEFAULT_BOOKS_PER_PAGE } from '@/constants';

// Types
import { TBooksResponse, TBookResponse } from '@/types';

// Services
import { httpClient, HttpMethod } from '@/services';

// Models
import { Book } from '@/models';

// Utils
import { formatErrorMessage } from '@/utils';

export async function getBookList(
  page?: number,
  limit?: number,
): Promise<TBooksResponse> {
  const endpoint = `${API_PATH.BOOKS}?page=${page}&limit=${limit || DEFAULT_BOOKS_PER_PAGE}`;

  try {
    const data = await httpClient.get<TBooksResponse>({
      endpoint,
      config: {
        next: {
          tags: [API_PATH.BOOKS],
        },
      },
    });

    return data;
  } catch (error) {
    return {
      error: formatErrorMessage(error),
    };
  }
}

export async function getBookById(id?: string): Promise<TBookResponse> {
  const endpoint = `${API_PATH.BOOKS}?id=${id}`;

  try {
    const data = await httpClient.get<TBooksResponse>({
      endpoint,
      config: {
        next: {
          tags: [API_PATH.BOOKS],
        },
      },
    });

    return {
      book: data.books?.[0],
    };
  } catch (error) {
    return {
      error: formatErrorMessage(error),
    };
  }
}

export async function createNewBook(data: Book): Promise<TBookResponse> {
  try {
    const response = await httpClient.request<Book, TBookResponse>({
      endpoint: API_PATH.BOOKS,
      method: HttpMethod.POST,
      body: data,
    });

    revalidateTag(API_PATH.BOOKS);

    return {
      book: response.book,
    };
  } catch (error) {
    return {
      error: formatErrorMessage(error),
    };
  }
}

export async function updateBook(data: Book): Promise<TBookResponse> {
  try {
    const response = await httpClient.request<Book, TBookResponse>({
      endpoint: `${API_PATH.BOOKS}/${data.id}`,
      method: HttpMethod.PUT,
      body: data,
    });

    revalidateTag(API_PATH.BOOKS);
    revalidateTag(API_PATH.CART);

    return {
      book: response.book,
    };
  } catch (error) {
    return {
      error: formatErrorMessage(error),
    };
  }
}

export async function deleteBook(bookId: string): Promise<TBookResponse> {
  try {
    const response = await httpClient.request<null, TBookResponse>({
      endpoint: `${API_PATH.BOOKS}/${bookId}`,
      method: HttpMethod.DELETE,
    });

    revalidateTag(API_PATH.BOOKS);
    revalidateTag(API_PATH.CART);

    return {
      book: response.book,
    };
  } catch (error) {
    return {
      error: formatErrorMessage(error),
    };
  }
}
