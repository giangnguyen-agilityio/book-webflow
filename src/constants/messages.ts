export const CART_MESSAGES = {
  REMOVE_TITLE: 'Remove Item',
  REMOVE_DESCRIPTION:
    'Are you sure you want to remove this item from your cart?',
  REMOVE_SUCCESS: 'Item removed from cart',
  ADD_SUCCESS: 'Item added to cart',
  UPDATE_SUCCESS: 'Cart updated successfully',
  EXCEED_STOCK: 'Cannot exceed available stock',
  CHECKOUT_SUCCESS: 'Thank you for your purchase! Your order has been placed.',
};

export const INVENTORY_STATUS = {
  OUT_OF_STOCK: 'Out of stock - Check back later',
  LOW_STOCK: (quantity: number) =>
    `Only ${quantity} ${quantity === 1 ? 'copy' : 'copies'} left! Order soon`,
  IN_STOCK: 'In Stock - Usually ships within 1-2 business days',
};

export const AUTH_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid username or password',
  AUTH_FAILED: 'Authentication failed. Please try again.',
  NETWORK_ERROR:
    'Authentication failed. Please check your network connection and try again.',
  REGISTRATION_FAILED: 'Failed to register account',
  USERNAME_MIN: 'Username must be at least 3 characters',
  PASSWORD_MIN: 'Password must be at least 6 characters',
  NAME_REQUIRED: 'Full name is required',
  EMAIL_REQUIRED: 'Email address is required',
  EMAIL_INVALID: 'Please enter a valid email address',
  USERNAME_EXISTS: 'This username is already exists',
};

export const BOOK_MESSAGES = {
  // Basic Information
  TITLE_REQUIRED: 'Please enter a book title',
  PRICE_INVALID: 'Please enter a valid price',
  PRICE_MUST_BE_POSITIVE: 'Price must be greater than or equal to 0',

  DESCRIPTION_MIN: 'Description must be at least 10 characters',
  LABEL_REQUIRED: 'Please enter a book label',

  QUANTITY_INVALID: 'Please enter a valid quantity',
  QUANTITY_MUST_BE_POSITIVE: 'Quantity must be greater than or equal to 0',

  INVALID_IMAGE_URL: 'Please enter a valid image URL',

  // Book Information
  PUBLISHER_REQUIRED: 'Please enter a publisher name',
  PUBLISHED_DATE_REQUIRED: 'Please select a published date',
  PUBLISHED_DATE_INVALID_FORMAT: 'Date must be in YYYY-MM-DD format',
  PUBLISHED_DATE_YEAR_MIN: 'The book must be published from 2000 onwards',
  LANGUAGE_REQUIRED: 'Please enter a language',
  LANGUAGE_LETTERS_ONLY: 'Language must contain only letters',

  PAPERBACK_INVALID: 'Please enter a valid number of pages',
  PAPERBACK_MUST_BE_POSITIVE: 'Number of pages must be greater than 0',

  ISBN_REQUIRED: 'Please enter an ISBN',

  // Dimensions
  DIMENSION_INVALID: 'Please enter a valid dimension',
  DIMENSION_MUST_BE_POSITIVE: 'Dimension must be greater than or equal to 0',

  ADD_BOOK_SUCCESS: 'Book added successfully',
};
