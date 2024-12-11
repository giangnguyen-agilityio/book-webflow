'use client';

import { NextUIProvider } from '@nextui-org/react';

// Context
import { ToastProvider, CartProvider } from '@/context';

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextUIProvider>
      <ToastProvider>
        <CartProvider>{children}</CartProvider>
      </ToastProvider>
    </NextUIProvider>
  );
}
