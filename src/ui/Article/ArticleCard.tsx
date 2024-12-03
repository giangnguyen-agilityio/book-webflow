import { memo } from 'react';
import Link from 'next/link';
import { cn } from '@nextui-org/theme';

// Models
import { Article } from '@/models';

// Constants
import { ImageStore } from '@/constants';

// Components
import { Heading, ImageFallback, Text } from '@/components';

interface ArticleCardProps {
  articleData: Article;
}

const ArticleCard = ({ articleData }: ArticleCardProps) => {
  const {
    id = 'N/A',
    title = 'N/A',
    description = 'N/A',
    createdDate = 'N/A',
    imageSrc = ImageStore.UnavailableImage,
  } = articleData;

  return (
    <article className="overflow-hidden shadow-md">
      <ImageFallback
        alt={title}
        className="w-full aspect-[410/326] border-2 border-blue-150/50 object-cover"
        height={326}
        src={imageSrc}
        width={410}
      />

      <div className="h-full bg-background-default p-6 md:py-7">
        <Heading
          as="h3"
          className="font-cardo font-bold text-xl md:text-3xl mb-3.5 line-clamp-2"
          textColor="text-text-primary"
        >
          {title}
        </Heading>

        <Text
          className="font-inter font-normal mb-7 line-clamp-3"
          textColor="text-text-secondary"
          type="wrap"
        >
          {description}
        </Text>

        <div className="flex items-center justify-between">
          <Link
            href={`/articles/${id}`}
            className={cn(
              'text-text-primary underline-offset-4 hover:underline',
              'font-cardo font-bold text-base md:text-md',
            )}
          >
            Read more
          </Link>

          <div className="font-inter font-normal text-base md:text-md text-text-primary">
            {createdDate}
          </div>
        </div>
      </div>
    </article>
  );
};

export default memo(ArticleCard);
