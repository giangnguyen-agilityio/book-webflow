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
