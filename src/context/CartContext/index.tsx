'use client';

import { createContext, useCallback, useContext, ReactNode } from 'react';

// Models
import { CartItem } from '@/models';

// Context
import { useToast } from '@/context';

// Constants
import { CART_MESSAGES } from '@/constants';

// Hooks
import { useCart } from '@/hooks';

interface CartContextType {
  isLoading: boolean;
  cartItems: CartItem[];
  addToCart: (id: string, orderedQuantity: number) => Promise<void>;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, newQuantity: number) => void;
  clearCart: () => void;
}

interface CartProviderProps {
  children: ReactNode;
  userId?: string;
}

// Context
const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider = ({ children, userId }: CartProviderProps) => {
  const { isLoading, cartItems, setCartItems, handleAddToCart } =
    useCart(userId);
  const { addToast } = useToast();

  const addToCart = useCallback(
    async (id: string, orderedQuantity: number) => {
      const success = await handleAddToCart(id, orderedQuantity);
      if (success) {
        const existingItem = cartItems.find((item) => item.bookId === id);
        addToast(
          existingItem
            ? CART_MESSAGES.UPDATE_SUCCESS
            : CART_MESSAGES.ADD_SUCCESS,
          'success',
        );
      }
    },
    [cartItems, handleAddToCart, addToast],
  );

  // Removes an item from cart
  // TODO: Need update
  const removeFromCart = useCallback(
    (id: string) => {
      const itemToRemove = cartItems.find((item) => item.id === id);
      if (!itemToRemove) return;

      setCartItems((prevItems) => {
        const updatedItems = prevItems.filter((item) => item.id !== id);
        return updatedItems;
      });

      addToast(CART_MESSAGES.REMOVE_SUCCESS, 'success');
    },
    [cartItems, setCartItems, addToast],
  );

  // Updates quantity of an item in cart
  // TODO: Need update
  const updateQuantity = useCallback((id: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              orderedQuantity: newQuantity,
              quantity: item.quantity + (item.orderedQuantity - newQuantity),
            }
          : item,
      ),
    );
  }, []);

  // Clears all items from cart
  // TODO: Need update
  const clearCart = useCallback(() => {
    setCartItems([]);
    addToast(CART_MESSAGES.CHECKOUT_SUCCESS, 'success');
  }, [addToast, setCartItems]);

  const contextValue = {
    isLoading,
    cartItems,
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
