'use server';

// Constants
import { API_PATH, DEFAULT_ARTICLES_PER_PAGE } from '@/constants';

// Types
import { TArticlesResponse, TArticleResponse } from '@/types';

// Services
import { httpClient } from '@/services';

// Utils
import { formatErrorMessage } from '@/utils';

const getArticleList = async (
  page?: number,
  limit?: number,
): Promise<TArticlesResponse> => {
  const endpoint = `${API_PATH.ARTICLES}?page=${page}&limit=${limit || DEFAULT_ARTICLES_PER_PAGE}`;

  try {
    const data = await httpClient.get<TArticlesResponse>({
      endpoint,
    });

    return data;
  } catch (error) {
    return {
      error: formatErrorMessage(error),
    };
  }
};

const getArticleById = async (id?: string): Promise<TArticleResponse> => {
  const endpoint = `${API_PATH.ARTICLES}?id=${id}`;

  try {
    const data = await httpClient.get<TArticlesResponse>({
      endpoint,
    });

    return {
      article: data.articles?.[0],
    };
  } catch (error) {
    return {
      error: formatErrorMessage(error),
    };
  }
};

export { getArticleList, getArticleById };
