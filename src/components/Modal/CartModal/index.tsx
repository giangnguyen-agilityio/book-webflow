'use client';

import Link from 'next/link';
import { memo, useCallback, useMemo, useState } from 'react';
import {
  Divider,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { cn } from '@nextui-org/theme';
import dynamic from 'next/dynamic';

// Constants
import { ROUTES, CART_MESSAGES } from '@/constants';

// Icons
import { CloseIcon } from '@/icons';

// Models
import { CartItem } from '@/models';

// Components
import { Button, Text, Heading, BaseModal } from '@/components';

const ConfirmModal = dynamic(() => import('@/components/Modal/ConfirmModal'), {
  ssr: false,
});

import CartModalItem from './CartModalItem';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onCheckout: () => void;
  cartItems?: CartItem[];
}

const CartModal = ({
  isOpen,
  onClose,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
  cartItems = [],
}: CartModalProps) => {
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);

  // Memoize subtotal calculation
  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.price * item.orderedQuantity,
        0,
      ),
    [cartItems],
  );

  const handleQuantityChange = useCallback(
    (id: string, value: string) => {
      const newQuantity = parseInt(value, 10);
      const item = cartItems.find((item) => item.id === id);

      if (item && !isNaN(newQuantity) && newQuantity > 0) {
        const finalQuantity = Math.min(
          newQuantity,
          item.quantity + item.orderedQuantity,
        );

        onUpdateQuantity(id, finalQuantity);
      }
    },
    [onUpdateQuantity, cartItems],
  );

  const handleRemoveClick = useCallback((id: string) => {
    setItemToRemove(id);
  }, []);

  const handleConfirmRemove = useCallback(() => {
    if (itemToRemove) {
      onRemoveItem(itemToRemove);
      setItemToRemove(null);
    }
  }, [itemToRemove, onRemoveItem]);

  const handleCancelRemove = useCallback(() => {
    setItemToRemove(null);
  }, []);

  const handleContinueShopping = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleCheckout = useCallback(() => {
    onCheckout();
    onClose();
  }, [onCheckout, onClose]);

  return (
    <>
      <BaseModal
        aria-label="Shopping Cart"
        data-testid="cart-modal"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalHeader
          className={cn(
            'flex justify-between items-center',
            'px-4 sm:px-6 md:px-8 py-4 sm:py-6',
            'bg-background-tertiary',
          )}
        >
          <Heading
            as="h2"
            textColor="text-text-primary"
            className={cn(
              'font-cardo font-bold',
              'text-5xl sm:text-7xl md:text-9xl',
            )}
          >
            Your Cart
          </Heading>
          <Button
            isIconOnly
            aria-label="Close cart"
            className="rounded-full p-1 sm:p-2"
            variant="outline"
            onPress={onClose}
          >
            <CloseIcon customClass="w-4 h-4 sm:w-6 sm:h-6" />
          </Button>
        </ModalHeader>

        <ModalBody className="px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8 pb-6 sm:pb-8">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <CartModalItem
                key={item.id}
                item={item}
                showDivider={index < cartItems.length - 1}
                onQuantityChange={handleQuantityChange}
                onRemoveClick={handleRemoveClick}
              />
            ))
          ) : (
            <div className="text-center">
              <Text
                type="wrap"
                className={cn(
                  'mb-6 sm:mb-10',
                  'text-base sm:text-lg md:text-xl lg:text-2xl',
                )}
              >
                Looks like you haven&apos;t added any items to your cart yet.
              </Text>
              <Button
                as={Link}
                href={ROUTES.STORE}
                className={cn(
                  'w-fit h-fit bg-background-primary text-text-default',
                  'rounded-md p-3 sm:p-4',
                  'font-cardo font-bold text-base sm:text-lg',
                  'hover:underline hover:underline-offset-4',
                )}
                onPress={handleContinueShopping}
              >
                Continue Shopping
              </Button>
            </div>
          )}
        </ModalBody>

        {cartItems.length > 0 && (
          <>
            <Divider className="bg-blue-150" />

            <ModalFooter
              className={cn(
                'flex flex-col',
                'gap-4 sm:gap-6',
                'px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 pb-6 sm:pb-8',
              )}
            >
              <div className="flex justify-between w-full">
                <Text
                  textColor="text-text-primary"
                  className={cn(
                    'font-cardo font-semibold',
                    'text-xl sm:text-2xl md:text-3xl',
                  )}
                >
                  Sub-Total
                </Text>
                <Text
                  className="font-inter text-lg sm:text-xl font-bold"
                  textColor="text-text-primary"
                >
                  ${subtotal.toFixed(2)} USD
                </Text>
              </div>
              <Button
                color="default"
                variant="solid"
                className={cn(
                  'w-full h-fit py-3 sm:py-4 md:py-5',
                  'text-base sm:text-lg font-cardo font-bold',
                )}
                onPress={handleCheckout}
              >
                Continue to Checkout
              </Button>
            </ModalFooter>
          </>
        )}
      </BaseModal>

      <ConfirmModal
        description={CART_MESSAGES.REMOVE_DESCRIPTION}
        isOpen={!!itemToRemove}
        title={CART_MESSAGES.REMOVE_TITLE}
        onCancel={handleCancelRemove}
        onConfirm={handleConfirmRemove}
      />
    </>
  );
};

export default memo(CartModal);
