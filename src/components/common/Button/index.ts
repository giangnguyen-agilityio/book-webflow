'use client';

import { extendVariants, Button as ButtonNextUI, cn } from '@heroui/react';

export const Button = extendVariants(ButtonNextUI, {
  variants: {
    variant: {
      bordered: 'border-1 data-[hover=true]:border-current',
      outline:
        'border-1 text-primary border-background-300 data-[hover=true]:border-background-200',
    },

    color: {
      default: 'text-primary',
      primary: 'text-secondary',
      danger: 'text-danger',
      success: 'text-success',
    },

    isIconOnly: {
      true: 'bg-none',
      ariaLabel: 'Button Icon',
    },

    disabled: {
      true: 'bg-gray-100 text-foreground-200 border-transparent cursor-not-allowed data-[hover=true]:!border-transparent !bg-opacity-100',
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
    radius: 'none',
  },

  compoundVariants: [
    {
      class: cn(
        'transition-colors',
        'font-cardo font-bold',
        'data-[hover=true]:!opacity-100 data-[hover=true]:bg-opacity-85',
      ),
    },

    {
      variant: 'solid',
      color: 'secondary',
      class: 'text-background bg-background-200',
    },

    {
      variant: 'solid',
      color: 'default',
      class:
        'bg-secondary border-1 border-transparent data-[hover=true]:border-background-500',
    },

    {
      variant: 'solid',
      color: ['primary', 'danger', 'success'],
      class: 'text-background',
    },

    {
      variant: ['bordered', 'outline'],
      color: ['default', 'primary', 'danger', 'success'],
      class: 'border-current',
    },
  ],
});
