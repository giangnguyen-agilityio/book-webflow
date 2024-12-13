import { cn } from '@nextui-org/theme';

// Components
import { BaseSkeleton } from '@/components';

const BookCardSkeleton = () => (
  <div className="bg-background-default">
    <div className="max-w-[400px] flex flex-col items-center mx-auto">
      <div className="w-full max-h-[500px] p-12.5 bg-background-secondary">
        <BaseSkeleton
          className={cn(
            'mx-auto aspect-[292/396] object-cover',
            'border-2 border-border-primary shadow',
          )}
        />
      </div>

      <div className="w-full mt-5">
        <div
          className={cn(
            'flex gap-4 lg:gap-10',
            'justify-start lg:justify-between mb-3',
          )}
        >
          <BaseSkeleton className="w-2/3 h-6 lg:h-6 3xl:h-8" />
          <BaseSkeleton className="w-1/3 h-6 lg:h-[22px] 3xl:h-[30px]" />
        </div>

        <BaseSkeleton className="w-full mb-6 h-6" />
        <BaseSkeleton className="w-full mb-6 h-6" />

        <div className="flex items-center gap-4 my-6">
          <BaseSkeleton className="w-5 h-6 rounded-full" />
          <BaseSkeleton className="w-2/3 h-6" />
        </div>

        <BaseSkeleton
          className={cn('self-start h-18', 'w-32 3xl:w-55 py-2 3xl:py-5')}
        />
      </div>
    </div>
  </div>
);

export default BookCardSkeleton;
