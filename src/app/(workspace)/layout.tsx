import { ReactNode } from 'react';

// Configs
import { auth } from '@/config';

// Components
import { Footer, Header } from '@/components';

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await auth();
  const userInfo = session?.user;

  return (
    <>
      <Header userInfo={userInfo} />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
