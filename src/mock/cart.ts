// Model
import { CartItem } from '@/models';

// Mock
import { MOCK_DEFAULT_BOOK_ITEM } from '@/mock';

const MOCK_DEFAULT_CART_ITEMS: CartItem[] = [
  { ...MOCK_DEFAULT_BOOK_ITEM, orderedQuantity: 2 },
  {
    ...MOCK_DEFAULT_BOOK_ITEM,
    id: '2',
    title: 'Another Book',
    price: 29.99,
    orderedQuantity: 1,
  },
];

export { MOCK_DEFAULT_CART_ITEMS };
