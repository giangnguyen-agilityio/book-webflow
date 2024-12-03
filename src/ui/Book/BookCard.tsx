'use client';

import { memo } from 'react';
import Link from 'next/link';
import { cn } from '@nextui-org/theme';

// Models
import { Book } from '@/models';

// Constants
import { ImageStore } from '@/constants';

// Components
import { Button, Heading, ImageFallback, Text } from '@/components';

interface BookCardProps {
  bookData: Book;
}

// const DEFAULT_ORDER_QUANTITY = 1;

const BookCard = ({ bookData }: BookCardProps) => {
  const {
    id = 'N/A',
    label = 'N/A',
    imageSrc = ImageStore.UnavailableImage,
    title = 'N/A',
    price = 0,
    description = 'N/A',
  } = bookData;

  const handleAddToCart = () => {
    // TODO: Implement the function to add the book to the cart
    // addToCart(bookData, DEFAULT_ORDER_QUANTITY);
  };

  return (
    <div className="bg-background-default">
      <div className="max-w-[400] flex flex-col items-center mx-auto">
        <Link className="w-full flex flex-col" href={`/store/${id}`}>
          <div className="w-full max-h-[500] p-12.5 bg-white-150">
            <ImageFallback
              alt={title}
              height={396}
              src={imageSrc}
              width={292}
              className={cn(
                'aspect-[292/396] object-cover',
                'border-2 border-border-primary shadow',
              )}
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
                className={cn(
                  'w-75 truncate font-cardo font-bold',
                  'text-xl lg:text-3xl 3xl:text-5xl',
                )}
              >
                {title}
              </Heading>

              <Text
                as="span"
                className={cn(
                  'font-inter font-bold min-w-fit',
                  'text-xl lg:text-2xl 3xl:text-4xl text-text-tertiary',
                )}
              >
                ${price.toFixed(2)}
              </Text>
            </div>

            <Text
              type="wrap"
              className={cn(
                'mb-6 line-clamp-2',
                'font-inter text-base xl:text-xl text-text-secondary',
              )}
            >
              {description}
            </Text>

            <div className="flex items-center gap-2 mb-4">
              <span className="w-4 h-4 rounded-full bg-background-tertiary" />
              <Text className="font-cardo font-bold text-base lg:text-3xl text-text-primary">
                {label}
              </Text>
            </div>
          </div>
        </Link>

        <Button
          className={cn(
            'self-start h-fit w-fit 3xl:w-55 py-2 3xl:py-5',
            'font-cardo font-bold text-lg',
          )}
          onPress={handleAddToCart}
        >
          Order Today
        </Button>
      </div>
    </div>
  );
};

export default memo(BookCard);
