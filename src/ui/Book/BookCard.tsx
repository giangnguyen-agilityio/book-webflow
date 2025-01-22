'use client';

import { memo, MouseEvent, useTransition } from 'react';
import { useDisclosure } from '@heroui/react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

// Utils
import { cn, generateUrl } from '@/utils';

// Models
import { Book } from '@/models';

// Constants
import { BOOK_MESSAGES, ImageStore, ROUTES } from '@/constants';

// Context
import { ToastType, useCartContext, useToast } from '@/context';

// Actions
import { deleteBook } from '@/apis';

// Icons
import { EditIcon, TrashIcon } from '@/icons';

// Components
import { Button, Heading, ImageFallback, Text } from '@/components';

const ConfirmModal = dynamic(() => import('@/components/Modal/ConfirmModal'), {
  ssr: false,
});

interface BookCardProps {
  bookData: Book;
  isAdmin: boolean;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}

const DEFAULT_ORDER_QUANTITY = 1;

const BookCard = ({
  bookData,
  isAdmin,
  totalItems,
  currentPage,
  itemsPerPage,
}: BookCardProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isPending, startTransition] = useTransition();

  const {
    id,
    label = 'N/A',
    imageSrc = ImageStore.UnavailableImage,
    title = 'N/A',
    price = 0,
    description = 'N/A',
    quantity = 0,
  } = bookData;

  const { cartItems, isLoading, addToCart } = useCartContext();
  const { addToast } = useToast();

  // Find if item exists in cart and check stock
  const cartItem = cartItems.find((item) => item.bookId === id);
  const availableQuantity = cartItem ? cartItem.quantity : quantity;
  const isOutOfStock = availableQuantity === 0 || quantity === 0;

  const handleAddToCart = async () => {
    if (isOutOfStock || isAdmin || isPending) return;

    startTransition(async () => {
      await addToCart(id, DEFAULT_ORDER_QUANTITY);
    });
  };

  const handleDeleteBook = async () => {
    if (isPending) return;

    startTransition(async () => {
      const response = await deleteBook(id);

      if (response.error) {
        addToast(response.error, ToastType.ERROR);
      } else {
        addToast(BOOK_MESSAGES.DELETE_BOOK_SUCCESS, ToastType.SUCCESS);

        const isLastItemOnPage =
          totalItems - (currentPage - 1) * itemsPerPage === 1;
        const isNotFirstPage = currentPage > 1;

        if (isLastItemOnPage && isNotFirstPage) {
          const prevPage = currentPage - 1;
          router.push(
            generateUrl(pathname, {
              queryParams: { page: prevPage },
            }),
          );
        }
        onClose();
      }
    });
  };

  const handleOpenDeleteModal = (e: MouseEvent) => {
    e.preventDefault();
    onOpen();
  };

  const handleCloseDeleteModal = () => {
    if (!isPending) {
      onClose();
    }
  };

  const handleEditBook = (e: MouseEvent) => {
    e.preventDefault();
    router.push(
      generateUrl(ROUTES.STORE, {
        pathParams: [id, 'edit'],
      }),
    );
  };

  return (
    <>
      <article className="bg-background">
        <div className="max-w-[400px] flex flex-col items-center mx-auto">
          <Link
            aria-label={`View details for ${title}`}
            className="w-full flex flex-col"
            href={`${ROUTES.STORE}/${id}`}
          >
            <div className="w-full max-h-[500px] p-8 md:p-10 lg:p-12.5 bg-background-100">
              <ImageFallback
                alt={title}
                height={396}
                quality={100}
                src={imageSrc}
                width={292}
                className={cn(
                  'mx-auto aspect-[292/396] object-cover',
                  'border-2 shadow',
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
                  textColor="text-primary"
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
                  textColor="text-secondary"
                  className={cn(
                    'font-inter font-bold min-w-fit',
                    'text-xl lg:text-2xl 3xl:text-4xl',
                  )}
                >
                  ${price.toFixed(2)}
                </Text>
              </div>

              <Text
                textColor="text-foreground-200"
                type="wrap"
                className={cn(
                  'mb-6 line-clamp-2',
                  'font-inter text-base xl:text-xl',
                )}
              >
                {description}
              </Text>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="w-4 h-4 rounded-full bg-secondary mr-2"
                  />
                  <Text
                    className="max-w-40 xl:max-w-60 font-cardo font-bold text-base lg:text-3xl"
                    textColor="text-primary"
                  >
                    {label}
                  </Text>
                </div>

                {isAdmin && (
                  <div className="flex items-center gap-3">
                    <Button
                      isIconOnly
                      aria-label="Edit book button"
                      color="success"
                      radius="full"
                      startContent={<EditIcon customClass="w-4 h-4" />}
                      variant="ghost"
                      onClick={handleEditBook}
                    />

                    <Button
                      isIconOnly
                      aria-label="Delete book button"
                      className="border-2 data-[hover=true]:border-danger data-[hover=true]:bg-danger data-[hover=true]:text-white"
                      color="danger"
                      radius="full"
                      startContent={<TrashIcon customClass="w-4 h-4" />}
                      variant="outline"
                      onClick={handleOpenDeleteModal}
                    />
                  </div>
                )}
              </div>
            </div>
          </Link>

          {!isAdmin && (
            <Button
              aria-label={isOutOfStock ? 'Out of stock' : 'Add to cart'}
              disabled={isOutOfStock || isPending}
              isLoading={isPending}
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
          )}
        </div>
      </article>

      <ConfirmModal
        description={`Are you sure you want to delete "${title}" book? This action cannot be undone.`}
        isLoading={isPending || isLoading}
        isOpen={isOpen}
        title="Delete Book"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleDeleteBook}
      />
    </>
  );
};

export default memo(BookCard);
