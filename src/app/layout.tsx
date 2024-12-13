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
  display: 'swap',
});

const cardo = Cardo({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-cardo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Book WebFlow',
    default: 'Book WebFlo',
  },
  description:
    'Browse and shop our curated collection of books. Find your next great read at Book WebFlow.',
  keywords: ['books', 'bookstore', 'online books', 'ebooks', 'reading'],
  openGraph: {
    title: 'Book WebFlow',
    description:
      'Browse and shop our curated collection of books. Find your next great read at Book WebFlow.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Book WebFlow',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${inter.variable} ${cardo.variable} antialiased`}>
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toast />
        </Providers>
      </body>
    </html>
  );
}
