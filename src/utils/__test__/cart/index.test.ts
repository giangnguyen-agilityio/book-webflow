import { CART_MESSAGES } from '@/constants';

// Utils
import { validateQuantity } from '@/utils';

describe('Cart Utils', () => {
  describe('validateQuantity', () => {
    it('should return valid for acceptable quantity', () => {
      const result = validateQuantity({
        quantity: 5,
        currentStock: 10,
        currentOrdered: 2,
      });

      expect(result).toEqual({ isValid: true });
    });

    it('should return invalid for negative or zero quantity', () => {
      const negativeResult = validateQuantity({
        quantity: -1,
        currentStock: 10,
        currentOrdered: 0,
      });

      const zeroResult = validateQuantity({
        quantity: 0,
        currentStock: 10,
        currentOrdered: 0,
      });

      expect(negativeResult).toEqual({
        isValid: false,
        message: CART_MESSAGES.QUANTITY_MUST_BE_POSITIVE,
      });

      expect(zeroResult).toEqual({
        isValid: false,
        message: CART_MESSAGES.QUANTITY_MUST_BE_POSITIVE,
      });
    });

    it('should return invalid when exceeding available stock', () => {
      const result = validateQuantity({
        quantity: 15,
        currentStock: 10,
        currentOrdered: 2,
      });

      expect(result).toEqual({
        isValid: false,
        message: CART_MESSAGES.EXCEED_STOCK,
      });
    });
  });
});
