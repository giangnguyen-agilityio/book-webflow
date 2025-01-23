'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Textarea } from '@heroui/react';
import { useRouter } from 'next/navigation';

// Constants
import { BOOK_MESSAGES, ImageStore, ROUTES } from '@/constants';

// Context
import { ToastType, useToast } from '@/context';

// Icons
import { LoadingIcon } from '@/icons';

// Schemas
import { BookSchema, type BookSchemaType } from '@/schemas';

// Models
import { Book } from '@/models';

// Types
import type { TBookResponse } from '@/types';

// Utils
import { cn } from '@/utils';

// Components
import {
  BackButton,
  Button,
  Input,
  Text,
  ImageUpload,
  NumberInput,
} from '@/components';

interface BookFormProps {
  onSubmit: (data: Book) => Promise<TBookResponse>;
  data?: Book;
}

const DEFAULT_VALUE: BookSchemaType = {
  title: '',
  price: 0,
  description: '',
  label: '',
  quantity: 0,
  imageSrc: '',
  publisher: '',
  publishedDate: '',
  language: '',
  paperback: 0,
  isbn: '',
  length: 0,
  width: 0,
  height: 0,
};

const BookForm = ({ onSubmit, data }: BookFormProps) => {
  const router = useRouter();
  const { addToast } = useToast();

  const {
    control,
    formState: { isValid, isDirty, isSubmitting, errors },
    clearErrors,
    handleSubmit,
  } = useForm<BookSchemaType>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: data
      ? {
          ...data,
          imageSrc: String(data.imageSrc),
          publisher: data.bookInformation.publisher,
          publishedDate: data.bookInformation.publishedDate,
          language: data.bookInformation.language,
          paperback: data.bookInformation.paperback,
          isbn: data.bookInformation.isbn,
          length: data.bookInformation.dimensions.length,
          width: data.bookInformation.dimensions.width,
          height: data.bookInformation.dimensions.height,
        }
      : DEFAULT_VALUE,
    resolver: zodResolver(BookSchema),
  });

  // Handle input change and clear errors
  const handleInputChange = useCallback(
    (name: keyof BookSchemaType, onChange: (value: string) => void) => {
      return (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);

        // Clear error message on change
        if (errors[name]?.message) {
          clearErrors(name);
        }
      };
    },
    [errors, clearErrors],
  );

  const handleBookSubmit = async (formData: BookSchemaType) => {
    const {
      publisher,
      publishedDate,
      language,
      paperback,
      isbn,
      length,
      width,
      height,
      ...mainInfo
    } = formData;

    const formattedData: Book = {
      ...mainInfo,
      id: data?.id || '',
      imageSrc: formData.imageSrc || ImageStore.UnavailableImage,
      bookInformation: {
        publisher,
        publishedDate,
        language,
        paperback,
        isbn,
        dimensions: {
          length,
          width,
          height,
        },
      },
    };

    const result = await onSubmit(formattedData);

    if (result.error) {
      addToast(result.error, ToastType.ERROR);
      return;
    }

    if (data) {
      router.back();
    } else {
      router.push(ROUTES.STORE);
    }

    addToast(
      data ? BOOK_MESSAGES.UPDATE_BOOK_SUCCESS : BOOK_MESSAGES.ADD_BOOK_SUCCESS,
      ToastType.SUCCESS,
    );
  };

  return (
    <form
      className="max-w-3xl mx-auto"
      onSubmit={handleSubmit(handleBookSubmit)}
    >
      <BackButton customClass="mb-4" />

      {/* Form Sections */}
      <div className="space-y-6">
        {/* Basic Information Section */}
        <section className="space-y-6">
          <Text
            as="span"
            className="font-inter text-xl md:text-2xl font-extrabold"
            textColor="text-primary"
            type="wrap"
          >
            Basic Information
          </Text>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Controller
              control={control}
              name="title"
              render={({
                field: { name, onChange, ...rest },
                fieldState: { error },
              }) => (
                <Input
                  {...rest}
                  isRequired
                  aria-label="Book title input field"
                  autoComplete="off"
                  data-testid="book-title-input"
                  errorMessage={error?.message}
                  isDisabled={isSubmitting}
                  isInvalid={!!error?.message}
                  label="Book Title"
                  labelPlacement="outside"
                  placeholder="Enter the book title"
                  radius="sm"
                  classNames={{
                    label: 'text-base pb-2',
                    inputWrapper: 'h-12',
                    errorMessage: 'text-[14px]',
                  }}
                  onChange={handleInputChange(name, onChange)}
                />
              )}
            />

            <Controller
              control={control}
              name="price"
              render={({
                field: { name, value, onChange, ...rest },
                fieldState: { error },
              }) => (
                <NumberInput
                  {...rest}
                  allowDecimal
                  isRequired
                  aria-label="Book price input field"
                  data-testid="book-price-input"
                  errorMessage={error?.message}
                  isDisabled={isSubmitting}
                  isInvalid={!!error?.message}
                  label="Price"
                  min={0}
                  placeholder="Enter price"
                  startContent="$"
                  value={String(value)}
                  classNames={{
                    label: 'text-base pb-2',
                    inputWrapper: 'h-12',
                    errorMessage: 'text-[14px]',
                  }}
                  onChange={handleInputChange(name, onChange)}
                />
              )}
            />
          </div>

          <Controller
            control={control}
            name="description"
            render={({
              field: { name, onChange, ...rest },
              fieldState: { error },
            }) => (
              <Textarea
                {...rest}
                isRequired
                aria-label="Book description input field"
                autoComplete="off"
                color="primary"
                data-testid="book-description-input"
                errorMessage={error?.message}
                isDisabled={isSubmitting}
                isInvalid={!!error?.message}
                label="Description"
                labelPlacement="outside"
                placeholder="Enter book description"
                radius="sm"
                classNames={{
                  base: '!mt-2.5',
                  label: 'text-base pb-2',
                  errorMessage: 'text-[14px]',
                  inputWrapper: cn(
                    'h-12 border border-background-500',
                    '!bg-background hover:!bg-background-500 focus-within:ring-2',
                    'transition-all duration-200',
                  ),
                  input: 'text-foreground-100 placeholder:text-foreground-400',
                }}
                onChange={handleInputChange(name, onChange)}
              />
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
            <Controller
              control={control}
              name="label"
              render={({
                field: { name, onChange, ...rest },
                fieldState: { error },
              }) => (
                <Input
                  {...rest}
                  isRequired
                  aria-label="Book label input field"
                  autoComplete="off"
                  data-testid="book-label-input"
                  errorMessage={error?.message}
                  isDisabled={isSubmitting}
                  isInvalid={!!error?.message}
                  label="Label"
                  labelPlacement="outside"
                  placeholder="Enter book label"
                  radius="sm"
                  classNames={{
                    label: 'text-base pb-2',
                    inputWrapper: 'h-12',
                    errorMessage: 'text-[14px]',
                  }}
                  onChange={handleInputChange(name, onChange)}
                />
              )}
            />

            <Controller
              control={control}
              name="quantity"
              render={({
                field: { name, value, onChange, ...rest },
                fieldState: { error },
              }) => (
                <NumberInput
                  {...rest}
                  isRequired
                  aria-label="Book quantity input field"
                  data-testid="book-quantity-input"
                  errorMessage={error?.message}
                  isDisabled={isSubmitting}
                  isInvalid={!!error?.message}
                  label="Quantity"
                  placeholder="Enter quantity"
                  value={String(value)}
                  classNames={{
                    label: 'text-base pb-2',
                    inputWrapper: 'h-12',
                    errorMessage: 'text-[14px]',
                  }}
                  onChange={handleInputChange(name, onChange)}
                />
              )}
            />
          </div>

          {/* Image Upload Section */}
          <Controller
            control={control}
            name="imageSrc"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <ImageUpload
                error={error?.message}
                isDisabled={isSubmitting}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </section>

        {/* Publication Details Section */}
        <section className="space-y-6">
          <Text
            as="span"
            className="font-inter text-xl md:text-2xl font-extrabold"
            textColor="text-primary"
            type="wrap"
          >
            Publication Details
          </Text>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
            <Controller
              control={control}
              name="publisher"
              render={({
                field: { name, onChange, ...rest },
                fieldState: { error },
              }) => (
                <Input
                  {...rest}
                  isRequired
                  aria-label="Book publisher input field"
                  autoComplete="off"
                  data-testid="book-publisher-input"
                  errorMessage={error?.message}
                  isDisabled={isSubmitting}
                  isInvalid={!!error?.message}
                  label="Publisher"
                  labelPlacement="outside"
                  placeholder="Enter publisher"
                  radius="sm"
                  classNames={{
                    label: 'text-base pb-2',
                    inputWrapper: 'h-12',
                    errorMessage: 'text-[14px]',
                  }}
                  onChange={handleInputChange(name, onChange)}
                />
              )}
            />

            <Controller
              control={control}
              name="publishedDate"
              render={({
                field: { name, onChange, ...rest },
                fieldState: { error },
              }) => (
                <Input
                  {...rest}
                  isRequired
                  aria-label="Book published date input field"
                  autoComplete="off"
                  data-testid="book-published-date-input"
                  errorMessage={error?.message}
                  isDisabled={isSubmitting}
                  isInvalid={!!error?.message}
                  label="Published Date"
                  labelPlacement="outside"
                  radius="sm"
                  type="date"
                  classNames={{
                    label: 'text-base pb-2',
                    inputWrapper: 'h-12',
                    errorMessage: 'text-[14px]',
                  }}
                  onChange={handleInputChange(name, onChange)}
                />
              )}
            />

            <Controller
              control={control}
              name="language"
              render={({
                field: { name, onChange, ...rest },
                fieldState: { error },
              }) => (
                <Input
                  {...rest}
                  isRequired
                  aria-label="Book language input field"
                  autoComplete="off"
                  data-testid="book-language-input"
                  errorMessage={error?.message}
                  isDisabled={isSubmitting}
                  isInvalid={!!error?.message}
                  label="Language"
                  labelPlacement="outside"
                  placeholder="Enter language"
                  radius="sm"
                  classNames={{
                    label: 'text-base pb-2',
                    inputWrapper: 'h-12',
                    errorMessage: 'text-[14px]',
                  }}
                  onChange={handleInputChange(name, onChange)}
                />
              )}
            />

            <Controller
              control={control}
              name="paperback"
              render={({
                field: { name, value, onChange, ...rest },
                fieldState: { error },
              }) => (
                <NumberInput
                  {...rest}
                  isRequired
                  aria-label="Book pages input field"
                  data-testid="book-paperback-input"
                  errorMessage={error?.message}
                  isDisabled={isSubmitting}
                  isInvalid={!!error?.message}
                  label="Number of Pages"
                  placeholder="Enter number of pages"
                  value={String(value)}
                  classNames={{
                    label: 'text-base pb-2',
                    inputWrapper: 'h-12',
                    errorMessage: 'text-[14px]',
                  }}
                  onChange={handleInputChange(name, onChange)}
                />
              )}
            />
          </div>

          <Controller
            control={control}
            name="isbn"
            render={({
              field: { name, onChange, ...rest },
              fieldState: { error },
            }) => (
              <Input
                {...rest}
                isRequired
                aria-label="Book ISBN input field"
                autoComplete="off"
                data-testid="book-isbn-input"
                errorMessage={error?.message}
                isDisabled={isSubmitting}
                isInvalid={!!error?.message}
                label="ISBN"
                labelPlacement="outside"
                placeholder="Enter ISBN"
                radius="sm"
                classNames={{
                  label: 'text-base pb-2',
                  inputWrapper: 'h-12',
                  errorMessage: 'text-[14px]',
                }}
                onChange={handleInputChange(name, onChange)}
              />
            )}
          />
        </section>

        {/* Dimensions Section */}
        <section className="space-y-6">
          <Text
            as="span"
            className="font-inter text-xl md:text-2xl font-extrabold"
            textColor="text-primary"
            type="wrap"
          >
            Book Dimensions
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Controller
              control={control}
              name="length"
              render={({
                field: { name, value, onChange, ...rest },
                fieldState: { error },
              }) => (
                <NumberInput
                  {...rest}
                  isRequired
                  aria-label="Book length input field"
                  data-testid="book-length-input"
                  errorMessage={error?.message}
                  isDisabled={isSubmitting}
                  isInvalid={!!error?.message}
                  label="Length"
                  placeholder="Length"
                  value={String(value)}
                  classNames={{
                    label: 'text-base pb-2',
                    inputWrapper: 'h-12',
                    errorMessage: 'text-[14px]',
                  }}
                  onChange={handleInputChange(name, onChange)}
                />
              )}
            />

            <Controller
              control={control}
              name="width"
              render={({
                field: { name, value, onChange, ...rest },
                fieldState: { error },
              }) => (
                <NumberInput
                  {...rest}
                  isRequired
                  aria-label="Book width input field"
                  data-testid="book-width-input"
                  errorMessage={error?.message}
                  isDisabled={isSubmitting}
                  isInvalid={!!error?.message}
                  label="Width"
                  placeholder="Width"
                  value={String(value)}
                  classNames={{
                    label: 'text-base pb-2',
                    inputWrapper: 'h-12',
                    errorMessage: 'text-[14px]',
                  }}
                  onChange={handleInputChange(name, onChange)}
                />
              )}
            />

            <Controller
              control={control}
              name="height"
              render={({
                field: { name, value, onChange, ...rest },
                fieldState: { error },
              }) => (
                <NumberInput
                  {...rest}
                  isRequired
                  aria-label="Book height input field"
                  data-testid="book-height-input"
                  errorMessage={error?.message}
                  isDisabled={isSubmitting}
                  isInvalid={!!error?.message}
                  label="Height"
                  placeholder="Height"
                  value={String(value)}
                  classNames={{
                    label: 'text-base pb-2',
                    inputWrapper: 'h-12',
                    errorMessage: 'text-[14px]',
                  }}
                  onChange={handleInputChange(name, onChange)}
                />
              )}
            />
          </div>
        </section>

        {/* Submit Button */}
        <div className="pt-6">
          <Button
            aria-label="Add new book"
            color="default"
            isDisabled={!isValid || !isDirty || isSubmitting}
            isLoading={isSubmitting}
            spinner={<LoadingIcon />}
            type="submit"
            variant="solid"
            className={cn(
              'w-full md:w-auto md:min-w-[200px] h-12',
              'font-cardo text-base font-extrabold',
              'transition-all duration-200',
            )}
          >
            {data ? 'Update Book' : 'Add New Book'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BookForm;
