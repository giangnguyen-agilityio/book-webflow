'use client';

import { useRouter } from 'next/navigation';
import { cn } from '@nextui-org/theme';

// Constants
import { ImageStore } from '@/constants';

// Models
import { Article } from '@/models';

// Icons
import { LeftArrowIcon } from '@/icons';

// Components
import { Button, ImageFallback, Text } from '@/components';

interface ArticleDetailProps {
  data: Article;
}

const ArticleDetail = ({ data }: ArticleDetailProps) => {
  const {
    title = '',
    imageSrc = ImageStore.UnavailableImage,
    createdDate = 'N/A',
    author = 'N/A',
    description = 'N/A',
    content = 'N/A',
  } = data;

  const router = useRouter();

  const handleNavigateBack = () => {
    router.back();
  };

  return (
    <article
      className={cn(
        'container mx-auto bg-background-default',
        'font-inter font-normal',
      )}
    >
      <Button
        startContent={<LeftArrowIcon />}
        variant="flat"
        className={cn(
          'mb-4 p-0 min-w-fit bg-transparent',
          'font-semibold text-lg text-text-primary',
          'hover:underline underline-offset-4',
        )}
        onPress={handleNavigateBack}
      >
        Back
      </Button>

      {/* Article Image Section */}
      <div className="relative w-full max-h-[700px] rounded-sm aspect-video">
        <ImageFallback
          fill
          priority
          alt={title}
          className="border-2 border-blue-150/50"
          quality={100}
          sizes="100vw"
          src={imageSrc}
        />
      </div>

      <div
        className={cn(
          'flex items-center gap-1 mt-4 mb-8',
          'font-cardo font-bold text-xl 3xl:text-3xl',
          'text-text-primary',
        )}
      >
        <time dateTime={createdDate}>{createdDate}</time>
        <span>/</span>
        <address className="not-italic">{author}</address>
      </div>

      <div className="flex flex-col gap-6">
        <Text
          className="text-base md:text-lg"
          textColor="text-text-secondary"
          type="wrap"
        >
          {description}
        </Text>

        <Text
          className="text-base md:text-lg"
          textColor="text-text-primary"
          type="wrap"
        >
          {content}
        </Text>
      </div>
    </article>
  );
};

export default ArticleDetail;
