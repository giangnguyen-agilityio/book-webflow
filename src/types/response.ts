// Models
import { Book, Article } from '@/models';

type TBooksResponse = {
  books?: Book[];
  count?: number;
  error?: string;
};

type TBookResponse = {
  book?: Book;
  error?: string;
};

type TArticlesResponse = {
  articles?: Article[];
  count?: number;
  error?: string;
};

type TArticleResponse = {
  article?: Article;
  error?: string;
};

export type {
  TBooksResponse,
  TBookResponse,
  TArticlesResponse,
  TArticleResponse,
};
