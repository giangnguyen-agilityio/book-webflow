import { Book } from './book';

interface CartItem extends Book {
  orderedQuantity: number;
}

export type { CartItem };
