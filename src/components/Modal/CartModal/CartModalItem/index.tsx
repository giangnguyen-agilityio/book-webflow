'use client';

import { memo } from 'react';
import { Divider, Input } from '@nextui-org/react';
import { cn } from '@nextui-org/theme';

// Models
import { CartItem } from '@/models';

// Components
import { Button, Text, ImageFallback } from '@/components';

interface CartModalItemProps {
  item: CartItem;
  showDivider: boolean;
  onQuantityChange: (id: string, value: string) => void;
  onRemoveClick: (id: string) => void;
}

const CartModalItem = ({
  item,
  showDivider,
  onQuantityChange,
  onRemoveClick,
}: CartModalItemProps) => {
  const { id, title, price, quantity, imageSrc, orderedQuantity } = item;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQuantityChange(id, e.target.value);
  };

  const handleRemoveClick = () => {
    onRemoveClick(id);
  };

  // Calculate remaining stock
  const remainingStock = quantity + orderedQuantity;
  const isLowStock = quantity < 5;

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6">
        <ImageFallback
          alt={title}
          height={176}
          src={imageSrc}
          width={130}
          className={cn(
            'w-full sm:w-32 md:w-[130px] min-h-44',
            'border-2 sm:border-4 border-blue-150',
            'object-cover',
          )}
        />
        <div className="flex-grow flex flex-col justify-between">
          <div className="flex justify-between">
            <div>
              <Text
                textColor="text-text-primary"
                className={cn(
                  'font-cardo font-bold',
                  'text-xl sm:text-2xl md:text-3xl',
                )}
              >
                {title}
              </Text>
              <Text
                textColor="text-text-secondary"
                className={cn(
                  'font-inter font-medium',
                  'text-base sm:text-lg md:text-xl',
                )}
              >
                ${price.toFixed(2)} USD
              </Text>
            </div>

            <Input
              aria-label={`Quantity for ${title}`}
              max={remainingStock}
              min="1"
              type="number"
              value={String(orderedQuantity)}
              classNames={{
                input: cn(
                  'font-medium text-lg sm:text-xl md:text-2xl',
                  '!text-text-primary',
                ),
                base: 'w-20 sm:w-24 md:w-28 h-10 sm:h-12 md:h-14',
                inputWrapper: cn(
                  'h-full rounded-none',
                  'border border-border-primary bg-background-secondary',
                  'bg-transparent hover:bg-transparent focus-within:ring-2',
                  'transition-all duration-200',
                ),
              }}
              onChange={handleQuantityChange}
            />
          </div>

          <div className="flex justify-between items-center mt-2 sm:mt-0">
            <Button
              color="default"
              variant="flat"
              className={cn(
                'w-fit p-0 hover:underline',
                'bg-transparent font-normal text-lg sm:text-xl md:text-2xl',
              )}
              onPress={handleRemoveClick}
            >
              Remove
            </Button>
            <Text
              className={cn(
                'text-sm text-text-secondary',
                isLowStock && 'text-text-error font-medium',
              )}
            >
              {`Only ${quantity} left in stock`}
            </Text>
          </div>
        </div>
      </div>
      {showDivider && <Divider className="bg-blue-150 mt-4 sm:mt-6" />}
    </div>
  );
};

export default memo(CartModalItem);
