'use client';

import { extendVariants, Button as ButtonNextUI } from '@nextui-org/react';

export const Button = extendVariants(ButtonNextUI, {
  variants: {
    variant: {
      solid: 'border-1 border-transparent font-cardo font-bold',
      outline: 'border-1 border-border-default font-cardo font-bold',
      light: 'bg-transparent font-cardo font-normal',
    },

    color: {
      default:
        'transition-colors bg-transparent text-text-primary data-[hover=true]:opacity-100 data-[hover=true]:border-border-secondary',
      primary:
        'transition-colors bg-background-tertiary text-text-primary data-[hover=true]:opacity-100 data-[hover=true]:border-border-secondary',
      secondary:
        'transition-colors bg-background-primary text-text-default data-[hover=true]:opacity-100 data-[hover=true]:bg-opacity-85',
    },

    isIconOnly: {
      true: 'bg-none',
      ariaLabel: 'Button Icon',
    },

    disabled: {
      true: 'bg-gray-100 text-gray-150 border-transparent cursor-not-allowed data-[hover=true]:border-transparent',
    },

    size: {
      md: 'w-9 h-8',
      lg: 'w-55 h-16.25 px-11 py-5',
      xl: 'w-75 h-16.25 px-27 py-5',
      '2xl': 'w-94.5 h-16.25 px-30 py-5',
      '3xl': 'w-161.75 h-16.25 px-55.5 py-5',
    },
  },

  defaultVariants: {
    variant: 'outline',
    color: 'default',
    radius: 'none',
  },
});
