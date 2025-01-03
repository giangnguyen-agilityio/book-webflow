// Constants
import { INVENTORY_STATUS } from '@/constants';

// Utils
import { getInventoryStatus } from '@/utils';

describe('getInventoryStatus', () => {
  it('should return OUT_OF_STOCK when availableQuantity is 0', () => {
    expect(getInventoryStatus(0)).toBe(INVENTORY_STATUS.OUT_OF_STOCK);
  });

  it('should return LOW_STOCK when availableQuantity is less than 5', () => {
    expect(getInventoryStatus(3)).toBe(INVENTORY_STATUS.LOW_STOCK(3));
  });

  it('should return IN_STOCK when availableQuantity is 5 or more', () => {
    expect(getInventoryStatus(10)).toBe(INVENTORY_STATUS.IN_STOCK);
  });
});
