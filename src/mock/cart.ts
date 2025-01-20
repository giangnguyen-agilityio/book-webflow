// Model
import { CartItem } from '@/models';

// Mock
import { MOCK_DEFAULT_BOOK_ITEM } from '@/mock';

const MOCK_USER_ID = 'user-1';

const MOCK_CART_ITEM: CartItem = {
  ...MOCK_DEFAULT_BOOK_ITEM,
  id: 'cart-1',
  bookId: MOCK_DEFAULT_BOOK_ITEM.id,
  authId: MOCK_USER_ID,
  orderedQuantity: 1,
  quantity: MOCK_DEFAULT_BOOK_ITEM.quantity - 1,
};

const MOCK_DEFAULT_CART_ITEMS: CartItem[] = [
  {
    ...MOCK_DEFAULT_BOOK_ITEM,
    id: '1',
    authId: '1',
    bookId: '1',
    orderedQuantity: 2,
  },
  {
    ...MOCK_DEFAULT_BOOK_ITEM,
    id: '2',
    authId: '1',
    bookId: '2',
    title: 'Another Book',
    price: 29.99,
    orderedQuantity: 1,
  },
];

export { MOCK_USER_ID, MOCK_CART_ITEM, MOCK_DEFAULT_CART_ITEMS };
