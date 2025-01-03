// Utils
import { cn } from '@/utils';

// Constants
import { ImageStore } from '@/constants';

// Models
import { Article } from '@/models';

// Components
import { BackButton, ImageFallback, Text } from '@/components';

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

  return (
    <article
      className={cn(
        'container mx-auto bg-background',
        'font-inter font-normal',
      )}
    >
      <BackButton />

      {/* Article Image Section */}
      <div className="relative w-full max-h-[700px] rounded-sm aspect-video">
        <ImageFallback
          fill
          priority
          alt={title}
          className="border-2 border-foreground-500/50"
          quality={100}
          sizes="(max-width: 425px) 304px, (max-width: 768px) 732px, (max-width: 1024px) 976px, 100vw"
          src={imageSrc}
        />
      </div>

      <div
        className={cn(
          'flex items-center gap-1 mt-4 mb-8',
          'font-cardo font-bold text-xl 3xl:text-3xl',
          'text-primary',
        )}
      >
        <time dateTime={createdDate}>{createdDate}</time>
        <span>/</span>
        <address className="not-italic">{author}</address>
      </div>

      <div className="flex flex-col gap-6">
        <Text
          className="text-base md:text-lg"
          textColor="text-foreground-200"
          type="wrap"
        >
          {description}
        </Text>

        <Text
          className="text-base md:text-lg"
          textColor="text-primary"
          type="wrap"
        >
          {content}
        </Text>
      </div>
    </article>
  );
};

export default ArticleDetail;
