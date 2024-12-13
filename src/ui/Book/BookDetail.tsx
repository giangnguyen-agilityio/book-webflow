'use client';

import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { Input } from '@nextui-org/react';
import { cn } from '@nextui-org/theme';

// Models
import { Book } from '@/models';

// Icons
import { CartIcon, LeftArrowIcon } from '@/icons';

// Constants
import { ImageStore } from '@/constants';

// Components
import { Button, Heading, ImageFallback, Text } from '@/components';

// Context
import { useCartContext } from '@/context';

interface BookDetailProps {
  data: Book;
}

const BookDetail = ({ data }: BookDetailProps) => {
  const [orderQuantity, setOrderQuantity] = useState(1);
  const { cartItems, addToCart } = useCartContext();
  const router = useRouter();

  const {
    id = 'N/A',
    imageSrc = ImageStore.UnavailableImage,
    title = 'N/A',
    price = 0,
    description = 'N/A',
    quantity = 0,
    bookInformation: {
      publisher = 'N/A',
      publishedDate = 'N/A',
      language = 'N/A',
      paperback = 0,
      isbn = 'N/A',
      dimensions: { length = 0, width = 0, height = 0 } = {},
    } = {},
  } = data;

  const bookDetails = [
    {
      label: 'Publisher',
      value: `${publisher} ${publishedDate ? `(${publishedDate})` : ''}`,
    },
    { label: 'Language', value: language },
    { label: 'Paperback', value: `${paperback} pages` },
    { label: 'ISBN-10', value: isbn },
    { label: 'Dimensions', value: `${length} x ${width} x ${height} cm` },
  ];

  const cartItem = cartItems.find((item) => item.id === id);
  const availableQuantity = cartItem ? cartItem.quantity : quantity;
  const isOutOfStock = availableQuantity === 0;

  const handleNavigateBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleQuantityChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value, 10);
      const finalQuantity = Math.min(value, availableQuantity);

      setOrderQuantity(finalQuantity);
    },
    [availableQuantity],
  );

  const handleAddToCart = useCallback(() => {
    addToCart(data, orderQuantity);
  }, [data, orderQuantity, addToCart]);

  return (
    <div>
      <Button
        startContent={<LeftArrowIcon />}
        variant="flat"
        className={cn(
          'mb-4 p-0 min-w-fit bg-transparent',
          'font-semibold text-lg text-text-primary',
          'hover:underline underline-offset-4',
        )}
        onPress={handleNavigateBack}
      >
        Back
      </Button>

      <div className="flex flex-col lg:flex-row gap-21">
        {/* Book Image Section */}
        <div className="w-full max-w-none lg:max-w-[580px] px-10 py-10 3xl:px-20 3xl:py-18 bg-background-secondary">
          <ImageFallback
            alt={title}
            height={510}
            src={imageSrc}
            width={380}
            className={cn(
              'aspect-[380/510] max-w-full max-h-[510px]',
              'mx-auto object-cover shadow-xl',
              'border-2 sm:border-4 border-border-primary',
            )}
          />
        </div>

        {/* Book Details Section */}
        <div className="w-full">
          <div className="flex flex-col gap-7">
            <div>
              <Heading
                as="h1"
                className="font-cardo text-3xl md:text-5xl font-bold"
                textColor="text-text-primary"
              >
                {title}
              </Heading>
              <Text
                as="span"
                className="font-inter text-xl md:text-3xl font-extrabold"
                textColor="text-text-tertiary"
                type="wrap"
              >
                ${price.toFixed(2)} USD
              </Text>
            </div>

            <Text
              className="font-inter text-base md:text-lg font-normal"
              textColor="text-text-secondary"
              type="wrap"
            >
              {description}
            </Text>

            <dl className="space-y-4 xl:space-y-6">
              {bookDetails.map(({ label, value }) => (
                <div key={label} className="grid grid-cols-3 gap-2">
                  <dt className="font-inter text-base md:text-lg font-normal text-text-secondary">
                    {label}:
                  </dt>
                  <dd className="col-span-2 text-base md:text-lg text-text-secondary">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex mt-8 gap-2 items-center">
            <Input
              aria-label={`Quantity for ${title}`}
              disabled={isOutOfStock}
              min={1}
              type="number"
              value={String(isOutOfStock ? 0 : orderQuantity)}
              classNames={{
                base: 'w-20 sm:w-24 md:w-28 h-10 sm:h-12 md:h-16.25',
                input:
                  'text-center text-lg sm:text-xl md:text-2xl font-medium !text-text-secondary',
                inputWrapper: cn(
                  'h-full rounded-none',
                  'border border-border-default',
                  'bg-background-secondary !bg-transparent',
                ),
              }}
              onChange={handleQuantityChange}
            />

            <Button
              aria-label={isOutOfStock ? 'Out of stock' : 'Add to cart'}
              color="default"
              disabled={isOutOfStock}
              startContent={<CartIcon customClass="w-5 h-5" />}
              variant="solid"
              className={cn(
                'w-full xl:w-94.5',
                'h-10 sm:h-12 md:h-16.25 py-5',
                'font-cardo text-base sm:text-lg font-bold',
              )}
              onPress={handleAddToCart}
            >
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
