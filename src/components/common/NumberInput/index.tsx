'use client';

import { useCallback, type ChangeEvent } from 'react';
import { InputProps } from '@heroui/react';

// Utils
import { isValidNumberFormat } from '@/utils';

// Components
import Input from '../Input';

// Types
interface NumberInputProps
  extends Omit<InputProps, 'type' | 'onChange' | 'value'> {
  value?: string;
  min?: number;
  max?: number;
  allowDecimal?: boolean;
  allowNegative?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const NumberInput = ({
  value = '',
  min,
  max,
  allowDecimal = false,
  allowNegative = false,
  onChange,
  ...props
}: NumberInputProps) => {
  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      if (!isValidNumberFormat(newValue, allowDecimal, allowNegative)) {
        return;
      }
      onChange?.(e);
    },
    [onChange, allowDecimal, allowNegative],
  );

  return (
    <Input
      {...props}
      autoComplete="off"
      inputMode={allowDecimal ? 'decimal' : 'numeric'}
      labelPlacement="outside"
      max={max}
      min={min}
      radius="sm"
      type="text"
      value={value}
      onChange={handleOnChange}
    />
  );
};

export default NumberInput;
