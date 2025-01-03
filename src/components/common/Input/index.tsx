'use client';

import { extendVariants, Input as InputNextUI } from '@nextui-org/react';

// Utils
import { cn } from '@/utils';

const Input = extendVariants(InputNextUI, {
  variants: {
    color: {
      primary: {
        inputWrapper: cn(
          'border border-background-500',
          '!bg-transparent hover:!bg-background-500 focus-within:ring-2',
          'transition-all duration-200',
        ),
        input: 'text-foreground-100 placeholder:text-foreground-100',
      },
      secondary: {
        inputWrapper: cn(
          'border border-background-300',
          '!bg-transparent focus-within:ring-2 ring-background-300',
          'transition-all duration-200',
        ),
        input: 'text-foreground-200 placeholder:text-foreground-200',
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
    color: 'primary',
  },
});

export default Input;
