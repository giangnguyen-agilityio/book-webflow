import { Divider } from '@nextui-org/react';
import { cn } from '@nextui-org/theme';

// Components
import { Heading, Text } from '@/components';

// Utils
import { formatMetadataTitle } from '@/utils';

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
        'banner bg-background-primary',
        'flex flex-col justify-center items-center',
        'pt-36 pb-30',
      )}
    >
      <Heading
        as="h1"
        className="font-cardo font-bold text-text-default text-7xl md:text-9xl"
      >
        {title}
      </Heading>

      <Divider className="h-1 w-14 mt-5 mb-3 md:mt-8.5 md:mb-7 bg-background-tertiary" />

      {metadataDescription && (
        <Text
          type="wrap"
          className={cn(
            'px-2 max-w-[633px]',
            'font-inter font-normal',
            'text-center text-base md:text-lg text-text-link',
          )}
        >
          {metadataDescription}
        </Text>
      )}
    </section>
  );
};

export default Banner;
