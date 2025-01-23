export const CART_MESSAGES = {
  REMOVE_TITLE: 'Remove Item',
  REMOVE_DESCRIPTION:
    'Are you sure you want to remove this item from your cart?',
  REMOVE_SUCCESS: 'Item has been removed from cart',
  ADD_SUCCESS: 'Item has been added to cart',
  REMOVE_FAILED: 'Failed to remove item from cart',
  UPDATE_SUCCESS: 'Cart has been updated successfully',
  UPDATE_FAILED: 'Failed to update the cart item',
  EXCEED_STOCK: 'Cannot exceed available stock',
  CHECKOUT_SUCCESS: 'Thank you for your purchase! Your order has been placed.',
  CHECKOUT_FAILED: 'Something went wrong with checkout. Please try again',
  QUANTITY_MUST_BE_POSITIVE: 'Quantity must be greater than 0',
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
  USERNAME_MAX: 'Username cannot exceed 30 characters',
  USERNAME_PATTERN:
    'Username can only contain letters, numbers, underscores, hyphens and dots',
  PASSWORD_MIN: 'Password must be at least 6 characters',
  NAME_REQUIRED: 'Full name is required',
  NAME_MAX: 'Full name cannot exceed 50 characters',
  NAME_PATTERN:
    'Full name can only contain letters, spaces, hyphens and apostrophes',
  EMAIL_REQUIRED: 'Email address is required',
  EMAIL_INVALID: 'Please enter a valid email address',
  USERNAME_EXISTS: 'This username is already exists',
  PASSWORD_NUMBER: 'Password must contain at least one number',
  PASSWORD_SPECIAL_CHAR: 'Password must contain at least one special character',
  PASSWORD_NO_SPACES: 'Password cannot contain spaces',
  USERNAME_NO_SPACES: 'Username cannot contain spaces',
};

export const BOOK_MESSAGES = {
  // Basic Information
  TITLE_REQUIRED: 'Please enter a book title',
  PRICE_INVALID: 'Please enter a valid price',
  PRICE_MUST_BE_POSITIVE: 'Price must be greater than 0',

  DESCRIPTION_MIN: 'Description must be at least 10 characters',
  LABEL_REQUIRED: 'Please enter a book label',

  QUANTITY_INVALID: 'Please enter a valid quantity',
  QUANTITY_MUST_BE_POSITIVE: 'Quantity must be greater than 0',

  INVALID_IMAGE: 'Please select an image',
  ONLY_IMAGE_FILES_ALLOWED: 'File type must be JPEG, PNG or WebP',
  IMAGE_SIZE_TOO_LARGE: 'File size must be less than 5MB',

  // Book Information
  PUBLISHER_REQUIRED: 'Please enter a publisher name',
  PUBLISHED_DATE_REQUIRED: 'Please select a published date',
  PUBLISHED_DATE_INVALID_FORMAT: 'Date must be in YYYY-MM-DD format',
  PUBLISHED_DATE_YEAR_RANGE:
    'Publication year must be between 2000 and current year',
  LANGUAGE_REQUIRED: 'Please enter a language',
  LANGUAGE_LETTERS_ONLY: 'Language must contain only letters',

  PAPERBACK_INVALID: 'Please enter a valid number of pages',
  PAPERBACK_MUST_BE_POSITIVE: 'Number of pages must be greater than 0',

  ISBN_REQUIRED: 'Please enter an ISBN',

  // Dimensions
  DIMENSION_INVALID: 'Please enter a valid dimension',
  DIMENSION_MUST_BE_POSITIVE: 'Dimension must be greater than 0',

  ADD_BOOK_SUCCESS: 'Book has been added successfully',
  UPDATE_BOOK_SUCCESS: 'Book has been updated successfully',
  DELETE_BOOK_SUCCESS: 'Book has been deleted successfully',
  FAILED_TO_FETCH_BOOK: 'Failed to fetch the book',
  UPLOAD_IMAGE_ERROR: 'Error occurred while uploading image',
  READ_FILE_FAILED: 'Unable to read the selected file',
};
