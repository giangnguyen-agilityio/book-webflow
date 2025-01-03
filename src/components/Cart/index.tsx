'use client';

import { memo } from 'react';
import { NavbarItem, Button, cn } from '@nextui-org/react';

// Icons
import { CartIcon } from '@/icons';

// Context
import { useCartContext } from '@/context';

interface CartButtonProps {
  onPress?: () => void;
}

const CartAction = ({ onPress }: CartButtonProps) => {
  const { cartItems } = useCartContext();
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
        radius="md"
        startContent={<CartIcon />}
        variant="light"
        className={cn(
          'text-foreground hover:text-secondary',
          quantity > 0 && 'pr-2 pt-1',
        )}
        onPress={onPress}
      />
      {quantity > 0 && (
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
