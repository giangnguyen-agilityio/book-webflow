'use client';

import { NextUIProvider } from '@nextui-org/react';

// Context
import { ToastProvider, CartProvider } from '@/context';

export default function Providers({
  children,
  userId,
}: Readonly<{
  children: React.ReactNode;
  userId?: string;
}>) {
  return (
    <NextUIProvider>
      <ToastProvider>
        <CartProvider userId={userId}>{children}</CartProvider>
      </ToastProvider>
    </NextUIProvider>
  );
}
