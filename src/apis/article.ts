// Constants
import { API_PATH, DEFAULT_ARTICLES_PER_PAGE } from '@/constants';

// Models
import { Article } from '@/models';

// Services
import { httpClient } from '@/services';

type TArticlesResponse = {
  articles: Article[];
  count: number;
};

const getArticleList = async (
  page?: number,
  limit?: number,
): Promise<TArticlesResponse> => {
  const endpoint = `${API_PATH.ARTICLES}?page=${page}&limit=${limit || DEFAULT_ARTICLES_PER_PAGE}`;

  try {
    const data = await httpClient.get<TArticlesResponse>({
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

const getArticleById = async (id?: string): Promise<Article> => {
  const endpoint = `${API_PATH.ARTICLES}?id=${id}`;

  try {
    const data = await httpClient.get<TArticlesResponse>({
      endpoint,
      config: {
        cache: 'force-cache',
      },
    });

    return data.articles?.[0];
  } catch (error) {
    throw new Error(String(error));
  }
};

export { getArticleList, getArticleById };
