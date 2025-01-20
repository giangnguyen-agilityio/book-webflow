import { Book } from './book';

interface CartItem extends Book {
  orderedQuantity: number;
  authId: string;
  bookId: string;
}

export type { CartItem };
