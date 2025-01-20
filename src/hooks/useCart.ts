import { useState, useEffect } from 'react';

// Models
import { CartItem } from '@/models';

// Actions
import { getCart } from '@/actions';

// Context
import { useToast } from '@/context';

export const useCart = (userId?: string) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) return;

      setIsLoading(true);
      const response = await getCart(userId);

      if (response.cart) {
        setCartItems(response.cart);
      }

      if (response.error) {
        addToast(response.error, 'error');
      }

      setIsLoading(false);
    };

    fetchCart();
  }, [userId, addToast]);

  return {
    isLoading,
    cartItems,
    setCartItems,
  };
};
