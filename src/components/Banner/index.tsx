import { Divider } from '@heroui/react';

// Components
import { Heading, Text } from '@/components';

// Utils
import { cn, formatMetadataTitle } from '@/utils';

// Types
import { MetadataDescription, MetadataTitle } from '@/types';

interface BannerProps {
  metadataTitle?: MetadataTitle;
  metadataDescription?: MetadataDescription;
}

const Banner = ({ metadataTitle, metadataDescription }: BannerProps) => {
  const title = formatMetadataTitle(metadataTitle);

  return (
    <section
      className={cn(
        'banner bg-background-200',
        'flex flex-col justify-center text-center items-center',
        'px-10 pt-20 pb-20 3xl:pt-36 3xl:pb-30',
      )}
    >
      <Heading
        as="h1"
        textColor="text-foreground"
        className={cn(
          'font-cardo font-bold',
          'text-5xl lg:text-7xl 3xl:text-9xl',
        )}
      >
        {title}
      </Heading>

      <Divider className="h-1 w-14 mt-5 mb-3 md:mt-8.5 md:mb-7 bg-secondary" />

      {metadataDescription && (
        <Text
          textColor="text-foreground-500"
          type="wrap"
          className={cn(
            'px-2 max-w-[633px]',
            'font-inter font-normal',
            'text-center text-base md:text-lg',
          )}
        >
          {metadataDescription}
        </Text>
      )}
    </section>
  );
};

export default Banner;
