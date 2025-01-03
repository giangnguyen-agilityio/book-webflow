import { memo } from 'react';
import { Divider } from '@nextui-org/react';

// Utils
import { cn } from '@/utils';

// Models
import { CartItem } from '@/models';

// Components
import { Button, Text, ImageFallback, Input } from '@/components';

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
            'border-2 sm:border-4 border-foreground-500',
            'object-cover',
          )}
          sizes="(max-width: 320px) 280px,
                 (max-width: 375px) 335px,
                 (max-width: 425px) 385px,
                 130px"
        />
        <div className="flex-grow flex flex-col justify-between">
          <div className="flex justify-between">
            <div>
              <Text
                textColor="text-primary"
                className={cn(
                  'font-cardo font-bold',
                  'text-xl sm:text-2xl md:text-3xl',
                )}
              >
                {title}
              </Text>
              <Text
                textColor="text-foreground-200"
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
              color="primary"
              max={remainingStock}
              min="1"
              size="lg"
              type="number"
              value={String(orderedQuantity)}
              classNames={{
                base: 'w-20 sm:w-24 md:w-28 h-10 sm:h-12 md:h-14',
                input: 'font-medium',
              }}
              onChange={handleQuantityChange}
            />
          </div>

          <Button
            color="default"
            variant="flat"
            className={cn(
              'w-fit p-0 hover:underline',
              'mt-2 sm:mt-0',
              'bg-transparent font-normal text-lg sm:text-xl md:text-2xl',
            )}
            onPress={handleRemoveClick}
          >
            Remove
          </Button>
        </div>
      </div>
      {showDivider && <Divider className="bg-background-500 mt-4 sm:mt-6" />}
    </div>
  );
};

export default memo(CartModalItem);
