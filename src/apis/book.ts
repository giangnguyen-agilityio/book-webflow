// Constants
import { API_PATH, DEFAULT_BOOKS_PER_PAGE } from '@/constants';

// Models
import { Book } from '@/models';

// Services
import { httpClient } from '@/services';

type TBooksResponse = {
  books: Book[];
  count: number;
};

const getBookList = async (page?: number): Promise<TBooksResponse> => {
  const endpoint = `${API_PATH.BOOKS}?page=${page}&limit=${DEFAULT_BOOKS_PER_PAGE}`;

  try {
    const data = await httpClient.get<TBooksResponse>({
      endpoint,
      config: {
        cache: 'force-cache',
      },
    });

    return data;
  } catch (error) {
    throw new Error(String(error));
  }
};

const getBookById = async (id?: string): Promise<Book> => {
  const endpoint = `${API_PATH.BOOKS}?id=${id}`;

  try {
    const data = await httpClient.get<TBooksResponse>({
      endpoint,
      config: {
        cache: 'force-cache',
      },
    });

    return data.books?.[0];
  } catch (error) {
    throw new Error(String(error));
  }
};

export { getBookList, getBookById };
