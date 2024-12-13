import { memo } from 'react';
import Link from 'next/link';
import { cn } from '@nextui-org/theme';

// Models
import { Article } from '@/models';

// Constants
import { ImageStore, ROUTES } from '@/constants';

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
    <article className="overflow-hidden shadow-md flex flex-col h-full">
      <div className="relative w-full aspect-[410/326]">
        <ImageFallback
          fill
          alt={title}
          className="mx-auto border-2 border-blue-150/50 object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={imageSrc}
        />
      </div>

      <div className="flex-1 flex flex-col bg-background-default p-6 md:py-7">
        <div className="flex-1">
          <Heading
            className="font-cardo font-bold text-xl md:text-3xl mb-3.5 line-clamp-2"
            textColor="text-text-primary"
          >
            {title}
          </Heading>

          <Text
            className="font-inter font-normal line-clamp-3"
            textColor="text-text-secondary"
            type="wrap"
          >
            {description}
          </Text>
        </div>

        <div className="flex items-center justify-between mt-7">
          <Link
            href={`${ROUTES.ARTICLES}/${id}`}
            className={cn(
              'text-text-primary underline-offset-4 hover:underline',
              'font-cardo font-bold text-base md:text-md',
            )}
          >
            <span className="sr-only">Read more about {title}</span>
            <span aria-hidden="true">Read more</span>
          </Link>

          <time
            className="font-inter font-normal text-base md:text-md text-text-primary"
            dateTime={createdDate}
          >
            {createdDate}
          </time>
        </div>
      </div>
    </article>
  );
};

export default memo(ArticleCard);
