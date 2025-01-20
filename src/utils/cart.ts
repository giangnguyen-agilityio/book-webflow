import { CART_MESSAGES } from '@/constants';

/**
 * Validates the requested quantity against current stock and ordered amounts
 * @param {Object} params - The validation parameters
 * @param {number} params.quantity - The quantity to validate
 * @param {number} params.currentStock - The current available stock
 * @param {number} params.currentOrdered - The amount currently in orders
 * @returns {Object} Validation result object
 * @returns {boolean} result.isValid - Whether the quantity is valid
 * @returns {string} [result.message] - Error message if validation fails
 */
export const validateQuantity = ({
  quantity,
  currentStock,
  currentOrdered,
}: {
  quantity: number;
  currentStock: number;
  currentOrdered: number;
}): { isValid: boolean; message?: string } => {
  if (quantity <= 0) {
    return {
      isValid: false,
      message: CART_MESSAGES.QUANTITY_MUST_BE_POSITIVE,
    };
  }

  if (quantity > currentStock + currentOrdered) {
    return {
      isValid: false,
      message: CART_MESSAGES.EXCEED_STOCK,
    };
  }

  return { isValid: true };
};
