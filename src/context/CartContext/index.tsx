'use client';

import { createContext, useCallback, useContext, ReactNode } from 'react';

// Models
import { CartItem } from '@/models';

// Context
import { ToastType, useToast } from '@/context';

// Constants
import { CART_MESSAGES } from '@/constants';

// Hooks
import { useCart } from '@/hooks';

interface CartContextType {
  isLoading: boolean;
  cartItems: CartItem[];
  addToCart: (id: string, orderedQuantity: number) => Promise<void>;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, value: string) => void;
  clearCart: () => void;
}

interface CartProviderProps {
  children: ReactNode;
  userId?: string;
}

// Context
const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider = ({ children, userId }: CartProviderProps) => {
  const {
    isLoading,
    items,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveFromCart,
    handleClearCart,
  } = useCart(userId);
  const { addToast } = useToast();

  const addToCart = useCallback(
    async (id: string, orderedQuantity: number) => {
      const success = await handleAddToCart(id, orderedQuantity);
      if (success) {
        const existingItem = items.find((item) => item.bookId === id);
        addToast(
          existingItem
            ? CART_MESSAGES.UPDATE_SUCCESS
            : CART_MESSAGES.ADD_SUCCESS,
          ToastType.SUCCESS,
        );
      }
    },
    [items, handleAddToCart, addToast],
  );

  // Removes an item from cart
  const removeFromCart = useCallback(
    async (id: string) => {
      const success = await handleRemoveFromCart(id);
      if (success) {
        addToast(CART_MESSAGES.REMOVE_SUCCESS, ToastType.SUCCESS);
      }
    },
    [handleRemoveFromCart, addToast],
  );

  // Updates quantity of an item in cart
  const updateQuantity = useCallback(
    async (id: string, value: string) => {
      const success = await handleUpdateQuantity(id, value);

      if (success) {
        addToast(CART_MESSAGES.UPDATE_SUCCESS, ToastType.SUCCESS);
      }
    },
    [handleUpdateQuantity, addToast],
  );

  // Clears all items from cart
  const clearCart = useCallback(async () => {
    const success = await handleClearCart();
    if (success) {
      addToast(CART_MESSAGES.CHECKOUT_SUCCESS, ToastType.SUCCESS);
    }
  }, [handleClearCart, addToast]);

  const contextValue = {
    isLoading,
    cartItems: items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider key={userId} value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }

  return context;
};

export { CartContext, CartProvider, useCartContext };
