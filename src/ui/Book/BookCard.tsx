'use client';

import { memo } from 'react';
import Link from 'next/link';

// Utils
import { cn } from '@/utils';

// Models
import { Book } from '@/models';

// Constants
import { ImageStore, ROUTES } from '@/constants';

// Context
import { useCartContext } from '@/context';

// Components
import { Button, Heading, ImageFallback, Text } from '@/components';

interface BookCardProps {
  bookData: Book;
}

const DEFAULT_ORDER_QUANTITY = 1;

const BookCard = ({ bookData }: BookCardProps) => {
  const {
    id = 'N/A',
    label = 'N/A',
    imageSrc = ImageStore.UnavailableImage,
    title = 'N/A',
    price = 0,
    description = 'N/A',
    quantity = 0,
  } = bookData;

  const { cartItems, addToCart } = useCartContext();

  // Find if item exists in cart to get actual quantity
  const cartItem = cartItems.find((item) => item.id === id);
  const availableQuantity = cartItem ? cartItem.quantity : quantity;
  const isOutOfStock = availableQuantity === 0;

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addToCart(bookData, DEFAULT_ORDER_QUANTITY);
    }
  };

  return (
    <article className="bg-background-default">
      <div className="max-w-[400px] flex flex-col items-center mx-auto">
        <Link
          aria-label={`View details for ${title}`}
          className="w-full flex flex-col"
          href={`${ROUTES.STORE}/${id}`}
        >
          <div className="w-full max-h-[500px] p-8 md:p-10 lg:p-12.5 bg-background-secondary">
            <ImageFallback
              alt={title}
              height={396}
              quality={100}
              src={imageSrc}
              width={292}
              className={cn(
                'mx-auto aspect-[292/396] object-cover',
                'border-2 border-border-primary shadow',
              )}
              sizes="(max-width: 425px) 90vw,
                     (max-width: 768px) 33vw,
                     (max-width: 1024px) 25vw,
                     (max-width: 1440px) 20vw,
                     292px"
            />
          </div>

          <div className="w-full mt-5">
            <div
              className={cn(
                'flex gap-4 lg:gap-10',
                'justify-start lg:justify-between mb-3',
              )}
            >
              <Heading
                textColor="text-text-primary"
                title={title}
                className={cn(
                  'w-75 truncate font-cardo font-bold',
                  'text-xl lg:text-3xl 3xl:text-5xl',
                )}
              >
                {title}
              </Heading>

              <Text
                as="span"
                textColor="text-text-tertiary"
                className={cn(
                  'font-inter font-bold min-w-fit',
                  'text-xl lg:text-2xl 3xl:text-4xl',
                )}
              >
                ${price.toFixed(2)}
              </Text>
            </div>

            <Text
              textColor="text-text-secondary"
              type="wrap"
              className={cn(
                'mb-6 line-clamp-2',
                'font-inter text-base xl:text-xl',
              )}
            >
              {description}
            </Text>

            <div className="flex items-center gap-2 mb-4">
              <span
                aria-hidden="true"
                className="w-4 h-4 rounded-full bg-background-tertiary"
              />
              <Text
                className="font-cardo font-bold text-base lg:text-3xl"
                textColor="text-text-primary"
              >
                {label}
              </Text>
            </div>
          </div>
        </Link>

        <Button
          aria-label={isOutOfStock ? 'Out of stock' : 'Add to cart'}
          disabled={isOutOfStock}
          variant="outline"
          className={cn(
            'self-start h-fit w-fit 3xl:w-55 py-2 3xl:py-5',
            'font-cardo font-bold text-lg',
            'transition-colors duration-300',
          )}
          onPress={handleAddToCart}
        >
          {isOutOfStock ? 'Out of Stock' : 'Order Today'}
        </Button>
      </div>
    </article>
  );
};

export default memo(BookCard);
