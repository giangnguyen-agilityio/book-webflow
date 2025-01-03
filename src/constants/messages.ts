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
