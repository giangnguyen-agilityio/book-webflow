'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Utils
import { cn, getInventoryStatus } from '@/utils';

// Models
import { Book } from '@/models';

// Icons
import { CartIcon, LeftArrowIcon } from '@/icons';

// Constants
import { ImageStore } from '@/constants';

// Components
import { Button, Heading, ImageFallback, Text, Input } from '@/components';

// Context
import { useCartContext } from '@/context';

interface BookDetailProps {
  data: Book;
  isAdmin: boolean;
}

const BookDetail = ({ data, isAdmin }: BookDetailProps) => {
  const [orderQuantity, setOrderQuantity] = useState(1);
  const { isLoading, cartItems, addToCart } = useCartContext();
  const router = useRouter();

  const {
    id,
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

  const cartItem = cartItems.find((item) => item.bookId === id);
  const availableQuantity = cartItem ? cartItem.quantity : quantity;
  const isOutOfStock = availableQuantity === 0 || quantity === 0;
  const isLowStock = availableQuantity < 5;

  const inventoryStatus = getInventoryStatus(availableQuantity);

  const handleNavigateBack = () => {
    router.back();
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);

    if (value < 1) {
      setOrderQuantity(1);
      return;
    }

    const finalQuantity = Math.min(value, availableQuantity);
    setOrderQuantity(finalQuantity);
  };

  const handleAddToCart = async () => {
    if (isOutOfStock || isAdmin || isLoading) return;

    await addToCart(id, orderQuantity);
  };

  return (
    <div>
      <Button
        startContent={<LeftArrowIcon />}
        variant="flat"
        className={cn(
          'mb-4 p-0 min-w-fit bg-transparent',
          'font-semibold text-lg text-primary',
          'hover:underline underline-offset-4',
        )}
        onPress={handleNavigateBack}
      >
        Back
      </Button>

      <div className="flex flex-col lg:flex-row gap-21">
        {/* Book Image Section */}
        <div className="w-full max-w-none lg:max-w-[580px] px-10 py-10 3xl:px-20 3xl:py-18 bg-background-100">
          <ImageFallback
            alt={title}
            height={510}
            sizes="(max-width: 425px) 224px, 380px"
            src={imageSrc}
            width={380}
            className={cn(
              'aspect-[380/510] max-w-full max-h-[510px]',
              'mx-auto object-cover shadow-xl',
              'border-2 sm:border-4 border-foreground-500',
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
                textColor="text-primary"
              >
                {title}
              </Heading>
              <Text
                as="span"
                className="font-inter text-xl md:text-3xl font-extrabold"
                textColor="text-secondary"
                type="wrap"
              >
                ${price.toFixed(2)} USD
              </Text>

              <Text
                className={cn(
                  'mt-2 font-medium',
                  'text-base md:text-lg text-success',
                  isLowStock && 'text-warning',
                  isOutOfStock && 'text-danger',
                )}
              >
                {inventoryStatus}
              </Text>
            </div>

            <Text
              className="font-inter text-base md:text-lg font-normal"
              textColor="text-foreground-200"
              type="wrap"
            >
              {description}
            </Text>

            <dl className="space-y-4 xl:space-y-6">
              {bookDetails.map(({ label, value }) => (
                <div key={label} className="grid grid-cols-3 gap-2">
                  <dt className="font-inter text-base md:text-lg font-normal text-foreground-200">
                    {label}:
                  </dt>
                  <dd className="col-span-2 text-base md:text-lg text-foreground-200">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Hide order section for Admin */}
          {!isAdmin && (
            <div className="flex mt-8 gap-2 items-center">
              <Input
                aria-label={`Quantity for ${title}`}
                color="secondary"
                disabled={isOutOfStock}
                inputMode="numeric"
                min={1}
                size="lg"
                type="number"
                value={String(isOutOfStock ? 0 : orderQuantity)}
                classNames={{
                  base: 'w-20 md:w-28 h-full sm:h-12 md:h-16.25',
                  input: 'font-medium text-center',
                  inputWrapper: 'p-3',
                }}
                onChange={handleQuantityChange}
              />

              <Button
                aria-label={isOutOfStock ? 'Out of stock' : 'Add to cart'}
                color="default"
                disableAnimation={isOutOfStock}
                disabled={isOutOfStock || isLoading}
                isLoading={isLoading}
                variant="solid"
                className={cn(
                  'w-full xl:w-94.5',
                  'h-14 sm:h-12 md:h-16.25 py-5',
                  'font-cardo text-base sm:text-lg font-bold',
                )}
                onPress={handleAddToCart}
                {...(!isLoading && {
                  startContent: <CartIcon customClass="w-5 h-5" />,
                })}
              >
                Add to Cart
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
