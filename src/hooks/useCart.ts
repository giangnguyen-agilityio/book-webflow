import { useState, useEffect } from 'react';
import { CartItem } from '@/models';

// Actions
import {
  getCart,
  addToCartAction,
  updateCartItem,
  updateBook,
} from '@/actions';

// APIs
import { getBookById } from '@/apis';

// Context
import { useToast } from '@/context';

// Constants
import { BOOK_MESSAGES, CART_MESSAGES } from '@/constants';

// Utils
import { formatErrorMessage } from '@/utils';

export const useCart = (userId?: string) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const handleFetchCart = async () => {
    if (!userId) return;
    setIsLoading(true);

    try {
      const response = await getCart(userId);
      if (response.cart) {
        setCartItems(response.cart);
      }
      if (response.error) {
        addToast(response.error, 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async (id: string, orderedQuantity: number) => {
    if (!userId) return;
    setIsLoading(true);

    try {
      // 1. Get book and validate
      const existingItem = cartItems.find((item) => item.bookId === id);
      const { book } = await getBookById(id);

      if (!book) {
        addToast(BOOK_MESSAGES.FAILED_TO_FETCH_BOOK, 'error');
        return false;
      }

      if (orderedQuantity > book.quantity) {
        addToast(CART_MESSAGES.EXCEED_STOCK, 'error');
        return false;
      }

      // 2. Prepare cart item
      const cartItem: CartItem = {
        ...book,
        id: existingItem?.id || '',
        bookId: book.id,
        orderedQuantity: existingItem
          ? existingItem.orderedQuantity + orderedQuantity
          : orderedQuantity,
        quantity: book.quantity - orderedQuantity,
        authId: userId,
      };

      // 3. Update cart
      const cartResponse = existingItem
        ? await updateCartItem(userId, cartItem)
        : await addToCartAction(userId, cartItem);

      if (cartResponse.error || !cartResponse.cart) {
        addToast(formatErrorMessage(cartResponse.error), 'error');
        return false;
      }

      // 4. Update book quantity
      const bookResponse = await updateBook({
        ...book,
        quantity: cartItem.quantity,
      });

      if (bookResponse.error) {
        addToast(formatErrorMessage(bookResponse.error), 'error');
        return false;
      }

      // 5. Update local state
      await handleFetchCart();
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchCart();
  }, [userId]);

  return {
    isLoading,
    cartItems,
    setCartItems,
    setIsLoading,
    handleAddToCart,
  };
};
