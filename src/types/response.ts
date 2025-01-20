// Models
import { Book, Article, CartItem } from '@/models';

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

type TCartResponse = {
  cart?: CartItem[];
  count?: number;
  error?: string;
};

type TCartItemResponse = {
  cart: CartItem | null;
  error?: string;
};

export type {
  TBooksResponse,
  TBookResponse,
  TArticlesResponse,
  TArticleResponse,
  TCartResponse,
  TCartItemResponse,
};
