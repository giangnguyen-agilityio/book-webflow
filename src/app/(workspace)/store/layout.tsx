import type { Metadata } from 'next';

// Components
import { Banner } from '@/components';

export const metadata: Metadata = {
  title: 'My Store',
  description: 'Browse and shop our wide range of products.',
  openGraph: {
    title: 'My Store | Book WebFlow',
    description: 'Browse and shop our wide range of products.',
  },
};

const StoreLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <>
    <Banner
      metadataDescription={metadata.description}
      metadataTitle={metadata.title}
    />
    {children}
  </>
);

export default StoreLayout;
