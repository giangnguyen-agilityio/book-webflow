import { useState, useEffect } from 'react';
import { CartItem } from '@/models';

// APIs
import {
  getCart,
  addItemToCart,
  updateCartItem,
  getBookById,
  updateBook,
  removeCartItem,
  clearCartItems,
} from '@/apis';

// Context
import { ToastType, useToast } from '@/context';

// Constants
import { BOOK_MESSAGES, CART_MESSAGES } from '@/constants';

// Utils
import { formatErrorMessage, validateQuantity } from '@/utils';

interface CartState {
  items: CartItem[];
  isLoading: boolean;
}

interface CartActions {
  handleFetchCart: () => Promise<void>;
  handleAddToCart: (id: string, orderedQuantity: number) => Promise<boolean>;
  handleUpdateQuantity: (id: string, value: string) => Promise<boolean>;
  handleRemoveFromCart: (id: string) => Promise<boolean>;
  handleClearCart: () => Promise<boolean>;
}

export const useCart = (userId?: string): CartState & CartActions => {
  const [state, setState] = useState<CartState>({
    items: [],
    isLoading: false,
  });
  const { addToast } = useToast();

  const handleSetItems = (items: CartItem[]) => {
    setState((prev) => ({ ...prev, items }));
  };

  const handleSetLoading = (isLoading: boolean) => {
    setState((prev) => ({ ...prev, isLoading }));
  };

  const handleFetchCart = async () => {
    if (!userId) return;
    handleSetLoading(true);

    try {
      const response = await getCart(userId);

      if (response.cart) {
        // Validate each cart item against existing books
        const validItems = await Promise.all(
          response.cart.map(async (item) => {
            const { book } = await getBookById(item.bookId);

            // If book doesn't exist anymore, remove it from cart
            if (!book) {
              await removeCartItem(userId, item.id);
              return null;
            }
            return item;
          }),
        );

        // Filter out null items (books that no longer exist)
        const filteredItems = validItems.filter(
          (item): item is CartItem => item !== null,
        );
        handleSetItems(filteredItems);
      }

      if (response.error) {
        addToast(response.error, ToastType.ERROR);
      }
    } finally {
      handleSetLoading(false);
    }
  };

  const handleAddToCart = async (
    id: string,
    orderedQuantity: number,
  ): Promise<boolean> => {
    if (!userId) return false;
    handleSetLoading(true);

    try {
      // 1. Get book and validate
      const existingItem = state.items.find((item) => item.bookId === id);
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
        : await addItemToCart(userId, cartItem);

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
      handleSetLoading(false);
    }
  };

  const handleUpdateQuantity = async (id: string, value: string) => {
    if (!userId || state.isLoading) return false;

    const itemToUpdate = state.items.find((item) => item.id === id);

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

    try {
      handleSetLoading(true);

      // Optimistically update UI
      const updatedCartItem = {
        ...itemToUpdate,
        orderedQuantity: parsedQuantity,
        quantity:
          itemToUpdate.quantity -
          (parsedQuantity - itemToUpdate.orderedQuantity),
      };

      const {
        orderedQuantity: _orderedQuantity,
        bookId: _bookId,
        authId: _authId,
        ...updatedBookData
      } = itemToUpdate;

      handleSetItems(
        state.items.map((item) => (item.id === id ? updatedCartItem : item)),
      );

      // Parallel API calls
      const [cartResponse, bookResponse] = await Promise.all([
        updateCartItem(userId, updatedCartItem),
        updateBook({
          ...updatedBookData,
          id: itemToUpdate.bookId,
          quantity:
            itemToUpdate.quantity -
            (parsedQuantity - itemToUpdate.orderedQuantity),
        }),
      ]);

      if (cartResponse.error || bookResponse.error) {
        handleSetItems(
          state.items.map((item) => (item.id === id ? itemToUpdate : item)),
        );

        addToast(CART_MESSAGES.UPDATE_FAILED, ToastType.ERROR);
        return false;
      }

      return true;
    } catch (error) {
      handleSetItems(
        state.items.map((item) => (item.id === id ? itemToUpdate : item)),
      );
      addToast(formatErrorMessage(error), ToastType.ERROR);

      return false;
    } finally {
      handleSetLoading(false);
    }
  };

  const handleRemoveFromCart = async (id: string): Promise<boolean> => {
    if (!userId || state.isLoading) return false;

    const itemToRemove = state.items.find((item) => item.id === id);
    if (!itemToRemove) return false;

    try {
      handleSetLoading(true);

      // Optimistic update
      const previousItems = [...state.items];
      handleSetItems(state.items.filter((item) => item.id !== id));

      // Remove from cart
      const cartResponse = await removeCartItem(userId, id);

      if (cartResponse?.error) {
        handleSetItems(previousItems);
        addToast(CART_MESSAGES.REMOVE_FAILED, ToastType.ERROR);
        return false;
      }

      return true;
    } catch (error) {
      handleSetItems(state.items);
      addToast(formatErrorMessage(error), ToastType.ERROR);
      return false;
    } finally {
      handleSetLoading(false);
    }
  };

  const handleClearCart = async (): Promise<boolean> => {
    if (!userId || state.isLoading || state.items.length === 0) return false;

    try {
      handleSetLoading(true);

      // Optimistic update
      const previousItems = [...state.items];
      handleSetItems([]);

      // Clear cart items
      const response = await clearCartItems(userId, previousItems);

      if (response?.error) {
        handleSetItems(previousItems);
        addToast(CART_MESSAGES.CHECKOUT_FAILED, ToastType.ERROR);
        return false;
      }

      return true;
    } catch (error) {
      handleSetItems(state.items);
      addToast(formatErrorMessage(error), ToastType.ERROR);
      return false;
    } finally {
      handleSetLoading(false);
    }
  };

  useEffect(() => {
    handleFetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return {
    // State
    items: state.items,
    isLoading: state.isLoading,

    // Actions
    handleFetchCart,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveFromCart,
    handleClearCart,
  };
};
