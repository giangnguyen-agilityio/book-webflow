import { Book } from './book';

interface CartItem extends Book {
  orderedQuantity: number;
}

interface Cart {
  items: CartItem[];
}

export type { CartItem, Cart };
