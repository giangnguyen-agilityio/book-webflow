import { Metadata } from 'next';
import { Inter, Cardo } from 'next/font/google';

// Providers
import Providers from '@/app/providers';

// Components
import { Footer, Header, Toast } from '@/components';

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

export const metadata: Metadata = {
  title: 'Book WebFlow Website',
  description: 'Browse and shop our wide range of products.',
  openGraph: {
    title: 'Book WebFlow Website',
    description: 'Browse and shop our wide range of products.',
  },
};

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
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <Toast />
        </Providers>
      </body>
    </html>
  );
}
