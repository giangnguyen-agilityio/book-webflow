// Component
import { BaseSkeleton } from '@/components';

const ArticleCardSkeleton = () => (
  <article className="overflow-hidden shadow-md">
    <BaseSkeleton className="w-full aspect-[410/326] rounded-none rounded-t-lg" />

    <div className="h-full bg-background-default p-6 md:py-7">
      <BaseSkeleton className="h-8 md:h-10 w-3/4 mb-3.5" />

      <BaseSkeleton className="h-4 w-full mb-2" />
      <BaseSkeleton className="h-4 w-full mb-2" />
      <BaseSkeleton className="h-4 w-2/3 mb-7" />

      <div className="flex items-center justify-between">
        <BaseSkeleton className="h-6 w-24" />
        <BaseSkeleton className="h-6 w-20" />
      </div>
    </div>
  </article>
);

export default ArticleCardSkeleton;
