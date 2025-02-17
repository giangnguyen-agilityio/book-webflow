import { Metadata } from 'next';
import { Inter, Cardo } from 'next/font/google';

// Providers
import Providers from '@/app/providers';

// Configs
import { auth } from '@/config';

// Components
import { Toast } from '@/components';

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
    default: 'Book WebFlow',
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const userId = session?.user?.id;

  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${inter.variable} ${cardo.variable} antialiased`}>
        <Providers userId={userId}>
          {children}
          <Toast />
        </Providers>
      </body>
    </html>
  );
}
