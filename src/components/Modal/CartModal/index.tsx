'use client';

import Link from 'next/link';
import { memo, useCallback, useMemo } from 'react';
import {
  Divider,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { cn } from '@nextui-org/theme';

// Constants
import { ROUTES } from '@/constants';

// Icons
import { CloseIcon } from '@/icons';

// Models
import { CartItem } from '@/models';

// Components
import { Button, Text, Heading, BaseModal, ImageFallback } from '@/components';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems?: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onCheckout: () => void;
}

const CartModal = ({
  isOpen,
  onClose,
  cartItems = [],
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
}: CartModalProps) => {
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

      if (
        item &&
        !isNaN(newQuantity) &&
        newQuantity > 0 &&
        newQuantity <= item.quantity
      ) {
        onUpdateQuantity(id, newQuantity);
      }
    },
    [onUpdateQuantity, cartItems],
  );

  const renderCartItem = (item: CartItem, index: number, array: CartItem[]) => (
    <div key={item.id}>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6">
        <ImageFallback
          alt={item.title}
          height={176}
          src={item.imageSrc}
          width={130}
          className={cn(
            'w-full sm:w-32 md:w-[130px] min-h-44',
            'border-2 sm:border-4 border-blue-150',
            'object-contain',
          )}
        />
        <div className="flex-grow flex flex-col justify-between">
          <div className="flex justify-between">
            <div>
              <Text
                className={cn(
                  'font-cardo font-bold text-text-primary',
                  'text-xl sm:text-2xl md:text-3xl',
                )}
              >
                {item.title}
              </Text>
              <Text
                className={cn(
                  'font-inter font-medium text-text-secondary',
                  'text-base sm:text-lg md:text-xl',
                )}
              >
                ${item.price.toFixed(2)} USD
              </Text>
            </div>

            <Input
              aria-label={`Quantity for ${item.title}`}
              max={item.quantity}
              min="1"
              type="number"
              value={String(item.orderedQuantity)}
              classNames={{
                input:
                  'font-medium text-lg sm:text-xl md:text-2xl !text-text-primary',
                base: 'w-20 sm:w-24 md:w-28 h-10 sm:h-12 md:h-14',
                inputWrapper: cn(
                  'h-full rounded-none',
                  'border border-border-primary bg-background-secondary',
                  'bg-transparent hover:bg-transparent',
                ),
              }}
              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center mt-2 sm:mt-0">
            <Button
              variant="flat"
              className={cn(
                'w-fit p-0 hover:underline',
                'font-cardo text-lg sm:text-xl md:text-2xl text-text-primary',
              )}
              onPress={() => onRemoveItem(item.id)}
            >
              Remove
            </Button>
            <Text className="text-sm text-text-secondary">
              {`Only ${item.quantity} left in stock`}
            </Text>
          </div>
        </div>
      </div>
      {index < array.length - 1 && array.length > 1 && (
        <Divider className="bg-blue-150 mt-4 sm:mt-6" />
      )}
    </div>
  );

  return (
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
          className={cn(
            'font-cardo font-bold text-text-primary',
            'text-5xl sm:text-7xl md:text-9xl',
          )}
        >
          Your Cart
        </Heading>
        <Button
          isIconOnly
          aria-label="Close cart"
          className="rounded-full p-1 sm:p-2"
          onPress={onClose}
        >
          <CloseIcon customClass="w-4 h-4 sm:w-6 sm:h-6" />
        </Button>
      </ModalHeader>

      <ModalBody className="px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8 pb-6 sm:pb-8">
        {cartItems.length > 0 ? (
          cartItems.map((item, index, array) =>
            renderCartItem(item, index, array),
          )
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
            <Link
              href={ROUTES.STORE}
              className={cn(
                'w-full bg-background-primary text-text-default',
                'rounded-md p-3 sm:p-4',
                'font-cardo font-bold text-base sm:text-lg',
                'hover:underline hover:underline-offset-4',
              )}
            >
              Continue Shopping
            </Link>
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
                className={cn(
                  'font-cardo font-medium text-text-primary',
                  'text-xl sm:text-2xl md:text-3xl',
                )}
              >
                Sub-Total
              </Text>
              <Text className="font-inter text-lg sm:text-xl font-bold text-text-primary">
                ${subtotal.toFixed(2)} USD
              </Text>
            </div>
            <Button
              color="primary"
              className={cn(
                'w-full py-3 sm:py-4 md:py-5',
                'text-base sm:text-lg font-cardo font-bold',
              )}
              onPress={onCheckout}
            >
              Continue to Checkout
            </Button>
          </ModalFooter>
        </>
      )}
    </BaseModal>
  );
};

export default memo(CartModal);
