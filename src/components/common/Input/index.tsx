'use client';

import { extendVariants, Input as InputNextUI } from '@nextui-org/react';

// Utils
import { cn } from '@/utils';

const Input = extendVariants(InputNextUI, {
  variants: {
    color: {
      primary: {
        inputWrapper: cn(
          'border border-border-primary',
          '!bg-transparent hover:!bg-blue-100 focus-within:ring-2',
          'transition-all duration-200',
        ),
        input: 'text-text-primary placeholder:text-text-primary',
      },
      secondary: {
        inputWrapper: cn(
          'border border-border-default',
          '!bg-transparent focus-within:ring-2 ring-border-default',
          'transition-all duration-200',
        ),
        input: 'text-text-secondary placeholder:text-text-secondary',
      },
    },
    size: {
      sm: {
        inputWrapper: 'h-10',
        input: 'text-small',
      },
      md: {
        inputWrapper: 'h-16',
        input: 'text-md',
      },
      lg: {
        inputWrapper: 'h-full',
        input: 'text-lg sm:text-xl md:text-2xl',
      },
    },
  },
  defaultVariants: {
    size: 'sm',
    radius: 'none',
  },
});

export default Input;
