// Component
import { BaseSkeleton } from '@/components';

const ArticleCardSkeleton = () => (
  <div className="overflow-hidden shadow-md flex flex-col h-full">
    <BaseSkeleton className="w-full aspect-[410/326] rounded-none rounded-t-lg" />

    <div className="flex-1 flex flex-col bg-background-default p-6 md:py-7">
      <div className="flex-1">
        <BaseSkeleton className="h-8 md:h-14 w-full mb-3.5" />
        <BaseSkeleton className="h-4 w-full mb-2" />
      </div>

      <BaseSkeleton className="h-4 w-full mb-2" />
      <BaseSkeleton className="h-4 w-2/3 mb-6" />

      <div className="flex items-center justify-between mt-7">
        <BaseSkeleton className="h-6 w-24" />
        <BaseSkeleton className="h-6 w-20" />
      </div>
    </div>
  </div>
);

export default ArticleCardSkeleton;
