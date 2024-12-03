import { cn } from '@nextui-org/theme';

// Components
import { BaseSkeleton } from '@/components';

const BookDetailBaseSkeleton = () => (
  <>
    {/* Book Image Section */}
    <div className="w-full max-w-[580] px-10 py-10 3xl:px-20 3xl:py-18 bg-white-150">
      <BaseSkeleton className="w-full h-[510] max-w-[380] mx-auto" />
    </div>

    {/* Book Details Section */}
    <div className="w-full">
      <div className="flex flex-col gap-7">
        <div>
          <BaseSkeleton className="h-9 md:h-12 w-3/4 mb-2" />
          <BaseSkeleton className="h-7 md:h-9 w-1/4" />
        </div>

        <BaseSkeleton className="h-20 w-full" />

        <div className="space-y-4 xl:space-y-6">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="grid grid-cols-3 gap-2">
              <BaseSkeleton className="h-6 md:h-7 w-full" />
              <BaseSkeleton className="h-6 md:h-7 w-full col-span-2" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex mt-8 gap-2 items-center">
        <BaseSkeleton className="w-20 sm:w-24 md:w-28 h-10 sm:h-12 md:h-16.25" />
        <BaseSkeleton
          className={cn('w-full xl:w-94.5', 'h-10 sm:h-12 md:h-16.25')}
        />
      </div>
    </div>
  </>
);

export default BookDetailBaseSkeleton;
