// Constants
import { INVENTORY_STATUS } from '@/constants';

/**
 * Determines the inventory status message based on available quantity
 *
 * @param availableQuantity - Number of items available in stock
 * @returns Appropriate inventory status message
 */
export const getInventoryStatus = (availableQuantity: number): string => {
  if (availableQuantity === 0) {
    return INVENTORY_STATUS.OUT_OF_STOCK;
  }

  if (availableQuantity < 5) {
    return INVENTORY_STATUS.LOW_STOCK(availableQuantity);
  }

  return INVENTORY_STATUS.IN_STOCK;
};
