import { z } from 'zod';

// Constants
import { BOOK_MESSAGES, REGEX_PATTERNS } from '@/constants';

const validateNumeric = (
  invalidMsg: string,
  positiveMsg: string,
  minValue = 0,
) => {
  return z.union([
    // Accept number directly
    z.number().min(minValue, positiveMsg),
    // Accept string that can be converted to number
    z
      .string()
      .min(1, invalidMsg)
      .refine((val) => !isNaN(Number(val)), invalidMsg)
      .refine((val) => Number(val) >= minValue, positiveMsg)
      .transform(Number),
  ]);
};

export const BookSchema = z.object({
  imageSrc: z.string().optional(),
  title: z.string().min(1, BOOK_MESSAGES.TITLE_REQUIRED),
  price: validateNumeric(
    BOOK_MESSAGES.PRICE_INVALID,
    BOOK_MESSAGES.PRICE_MUST_BE_POSITIVE,
  ),
  description: z.string().min(10, BOOK_MESSAGES.DESCRIPTION_MIN),
  label: z.string().min(1, BOOK_MESSAGES.LABEL_REQUIRED),
  quantity: validateNumeric(
    BOOK_MESSAGES.QUANTITY_INVALID,
    BOOK_MESSAGES.QUANTITY_MUST_BE_POSITIVE,
  ),
  publisher: z.string().min(1, BOOK_MESSAGES.PUBLISHER_REQUIRED),
  publishedDate: z
    .string()
    .min(1, BOOK_MESSAGES.PUBLISHED_DATE_REQUIRED)
    .regex(
      REGEX_PATTERNS.DATE_FORMAT,
      BOOK_MESSAGES.PUBLISHED_DATE_INVALID_FORMAT,
    )
    .refine((date) => {
      const year = parseInt(date.split('-')[0]);
      return year >= 2000;
    }, BOOK_MESSAGES.PUBLISHED_DATE_YEAR_MIN),
  language: z
    .string()
    .min(1, BOOK_MESSAGES.LANGUAGE_REQUIRED)
    .regex(REGEX_PATTERNS.LETTERS_ONLY, BOOK_MESSAGES.LANGUAGE_LETTERS_ONLY),
  paperback: validateNumeric(
    BOOK_MESSAGES.PAPERBACK_INVALID,
    BOOK_MESSAGES.PAPERBACK_MUST_BE_POSITIVE,
    1,
  ),
  isbn: z.string().min(1, BOOK_MESSAGES.ISBN_REQUIRED),
  length: validateNumeric(
    BOOK_MESSAGES.DIMENSION_INVALID,
    BOOK_MESSAGES.DIMENSION_MUST_BE_POSITIVE,
  ),
  width: validateNumeric(
    BOOK_MESSAGES.DIMENSION_INVALID,
    BOOK_MESSAGES.DIMENSION_MUST_BE_POSITIVE,
  ),
  height: validateNumeric(
    BOOK_MESSAGES.DIMENSION_INVALID,
    BOOK_MESSAGES.DIMENSION_MUST_BE_POSITIVE,
  ),
});

export type BookSchemaType = z.infer<typeof BookSchema>;
