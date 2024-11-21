import { Inter, Cardo } from 'next/font/google';

// Providers
import Providers from '@/app/providers';

import './globals.css';

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-inter',
});

const cardo = Cardo({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-cardo',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${inter.variable} ${cardo.variable}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
