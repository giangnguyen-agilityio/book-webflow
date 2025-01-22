'use client';

import { memo } from 'react';
import { NavbarItem, Button, cn } from '@heroui/react';

// Icons
import { CartIcon, LoadingIcon } from '@/icons';

// Context
import { useCartContext } from '@/context';

interface CartButtonProps {
  onPress?: () => void;
}

const CartAction = ({ onPress }: CartButtonProps) => {
  const { cartItems, isLoading } = useCartContext();
  const quantity = cartItems.length;

  let formattedQuantity = '';
  switch (true) {
    case quantity < 10:
      formattedQuantity = `0${quantity}`;
      break;
    case quantity <= 99:
      formattedQuantity = quantity.toString();
      break;
    default:
      formattedQuantity = '99+';
      break;
  }

  return (
    <NavbarItem className="relative">
      <Button
        isIconOnly
        aria-label="Cart Button"
        className={cn('pr-2 pt-1', 'text-foreground hover:text-secondary')}
        radius="md"
        startContent={<CartIcon />}
        variant="light"
        onPress={onPress}
      />

      {isLoading && (
        <span
          className={cn(
            'font-extrabold text-[10px]',
            'absolute top-0 right-0',
            'w-5 h-5 flex items-center justify-center rounded-full',
          )}
        >
          <LoadingIcon customClass="text-warning" />
        </span>
      )}

      {quantity > 0 && !isLoading && (
        <span
          className={cn(
            'font-extrabold text-[10px]',
            'absolute top-0 right-0',
            'w-5 h-5 flex items-center justify-center rounded-full',
            'bg-secondary text-primary',
          )}
        >
          {formattedQuantity}
        </span>
      )}
    </NavbarItem>
  );
};

export default memo(CartAction);
