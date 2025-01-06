'use client';

import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext,
  ReactNode,
} from 'react';

// Models
import { Book, CartItem } from '@/models';

// Context
import { useToast } from '@/context';

// Constants
import { CART_MESSAGES } from '@/constants';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (book: Book, quantity: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

interface CartProviderProps {
  children: ReactNode;
}

const CART_STORAGE_KEY = 'bookstore_cart';

// Context
const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { addToast } = useToast();

  // Load cart items from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (_error) {
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }
  }, []);

  // Persist cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  // Adds a book to cart or updates quantity if already exists
  const addToCart = useCallback(
    (book: Book, quantity: number) => {
      const existingItem = cartItems.find((item) => item.id === book.id);
      const newQuantity = existingItem
        ? existingItem.orderedQuantity + quantity
        : quantity;

      // Check against original book quantity instead of cart item quantity
      if (newQuantity > book.quantity) {
        addToast(CART_MESSAGES.EXCEED_STOCK, 'error');
        return;
      }

      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === book.id);

        if (existingItem) {
          return prevItems.map((item) =>
            item.id === book.id
              ? {
                  ...item,
                  orderedQuantity: newQuantity,
                  quantity: book.quantity - newQuantity,
                }
              : item,
          );
        }

        return [
          ...prevItems,
          {
            ...book,
            orderedQuantity: quantity,
            quantity: book.quantity - quantity,
          },
        ];
      });

      // Show success toast after state update
      if (existingItem) {
        addToast(CART_MESSAGES.UPDATE_SUCCESS, 'success');
      } else {
        addToast(CART_MESSAGES.ADD_SUCCESS, 'success');
      }
    },
    [addToast, cartItems],
  );

  // Removes an item from cart
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
    [addToast, cartItems],
  );

  // Updates quantity of an item in cart
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
  const clearCart = useCallback(() => {
    setCartItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
    addToast(CART_MESSAGES.CHECKOUT_SUCCESS, 'success');
  }, [addToast]);

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
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
