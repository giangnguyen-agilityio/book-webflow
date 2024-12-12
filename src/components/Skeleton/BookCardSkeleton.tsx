import { cn } from '@nextui-org/theme';

// Components
import { BaseSkeleton } from '@/components';

const BookCardBaseSkeleton = () => (
  <div>
    <div className="max-w-[400px] flex flex-col items-center mx-auto">
      <div className="w-full flex flex-col">
        <div className="w-full max-h-[500px] p-12.5 bg-background-secondary">
          <BaseSkeleton
            className={cn(
              'max-w-[292px] h-[396px]',
              'border-2 border-border-primary',
            )}
          />
        </div>

        <div className="w-full mt-5">
          <div className="flex gap-4 lg:gap-10 justify-start lg:justify-between mb-3">
            <BaseSkeleton className="w-3/4 h-8" />
            <BaseSkeleton className="w-1/4 h-8" />
          </div>

          <BaseSkeleton className="w-full h-16 mb-6" />

          <div className="flex items-center gap-2 mb-4">
            <BaseSkeleton className="w-4 h-4 rounded-full" />
            <BaseSkeleton className="w-1/3 h-6" />
          </div>
        </div>
      </div>

      <BaseSkeleton
        className={cn('self-start h-10', 'w-32 3xl:w-55 py-2 3xl:py-5')}
      />
    </div>
  </div>
);

export default BookCardBaseSkeleton;
