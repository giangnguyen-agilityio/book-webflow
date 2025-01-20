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
import { ToastType, useToast } from '@/context';

// Constants
import { BOOK_MESSAGES, CART_MESSAGES } from '@/constants';

// Utils
import { formatErrorMessage, validateQuantity } from '@/utils';

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
        addToast(response.error, ToastType.ERROR);
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
        addToast(BOOK_MESSAGES.FAILED_TO_FETCH_BOOK, ToastType.ERROR);
        return false;
      }

      if (orderedQuantity > book.quantity) {
        addToast(CART_MESSAGES.EXCEED_STOCK, ToastType.ERROR);
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
        addToast(formatErrorMessage(cartResponse.error), ToastType.ERROR);
        return false;
      }

      // 4. Update book quantity
      const bookResponse = await updateBook({
        ...book,
        quantity: cartItem.quantity,
      });

      if (bookResponse.error) {
        addToast(formatErrorMessage(bookResponse.error), ToastType.ERROR);
        return false;
      }

      // 5. Update local state
      await handleFetchCart();
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateQuantity = async (id: string, value: string) => {
    if (!userId || isLoading) return false;

    const itemToUpdate = cartItems.find((item) => item.id === id);
    if (!itemToUpdate) return false;

    const parsedQuantity = parseInt(value, 10);

    // Validate quantity
    const { isValid, message } = validateQuantity({
      quantity: parsedQuantity,
      currentStock: itemToUpdate.quantity,
      currentOrdered: itemToUpdate.orderedQuantity,
    });

    if (!isValid) {
      addToast(message!, ToastType.ERROR);
      return false;
    }

    // Calculate new quantities
    const quantityDiff = parsedQuantity - itemToUpdate.orderedQuantity;
    const newBookQuantity = itemToUpdate.quantity - quantityDiff;

    try {
      setIsLoading(true);

      // Optimistically update UI
      const updatedCartItem: CartItem = {
        ...itemToUpdate,
        orderedQuantity: parsedQuantity,
        quantity: newBookQuantity,
      };

      const bookUpdateData: Omit<
        CartItem,
        'orderedQuantity' | 'bookId' | 'authId'
      > = {
        ...itemToUpdate,
        quantity: newBookQuantity,
      };

      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? updatedCartItem : item)),
      );

      // Parallel API calls
      const [cartResponse, bookResponse] = await Promise.all([
        updateCartItem(userId, updatedCartItem),
        updateBook(bookUpdateData),
      ]);

      if (cartResponse.error || bookResponse.error) {
        setCartItems((prev) =>
          prev.map((item) => (item.id === id ? itemToUpdate : item)),
        );
        addToast(CART_MESSAGES.UPDATE_FAILED, ToastType.ERROR);
        return false;
      }

      return true;
    } catch (error) {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? itemToUpdate : item)),
      );
      addToast(formatErrorMessage(error), ToastType.ERROR);

      return false;
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
    handleUpdateQuantity,
  };
};
