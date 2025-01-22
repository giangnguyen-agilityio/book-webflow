'use client';

import { HeroUIProvider } from '@heroui/react';

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
    <HeroUIProvider>
      <ToastProvider>
        <CartProvider userId={userId}>{children}</CartProvider>
      </ToastProvider>
    </HeroUIProvider>
  );
}
