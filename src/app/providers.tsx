'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ToastProvider } from '@/context/ToastContext';

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextUIProvider>
      <ToastProvider>{children}</ToastProvider>
    </NextUIProvider>
  );
}
