'use client';

import React, { memo } from 'react';
import {
  extendVariants,
  Pagination as PaginationNextUI,
  PaginationProps as NextUIPaginationProps,
} from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// Utils
import { cn } from '@/utils';

// Icons
import { LeftArrowIcon, RightArrowIcon } from '@/icons';

// Constants
import { DEFAULT_PAGE, SEARCH_QUERIES } from '@/constants';

// Component
import { Button } from '@/components';

export const CustomPagination = extendVariants(PaginationNextUI, {
  variants: {
    color: {
      primary: {
        base: 'py-0 px-4',
        item: cn(
          'bg-transparent shadow-none',
          'font-cardo text-base lg:text-lg xl:text-xl',
          '[&[data-hover=true]:not([data-active=true])]:text-text-primary dark:[&[data-hover=true]:not([data-active=true])]:bg-background-primary',
        ),
        cursor:
          'bg-background-primary hover:bg-background-primary hover:text-text-default',
      },
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

const Pagination = ({ total, ...props }: NextUIPaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const currentPage = Number(
    searchParams?.get(SEARCH_QUERIES.PAGE) || DEFAULT_PAGE,
  );

  const buttonClass = (isDisabled: boolean) =>
    cn(
      'p-0 font-cardo font-bold',
      'text-base lg:text-lg xl:text-xl',
      'bg-transparent data-[hover=true]:bg-transparent',
      {
        'text-text-primary': !isDisabled,
      },
    );

  const prevButtonClass = buttonClass(currentPage === DEFAULT_PAGE);
  const nextButtonClass = buttonClass(currentPage === total);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(String(searchParams));

    params.set(SEARCH_QUERIES.PAGE, String(page));

    replace(`${pathname}?${params.toString()}`);
  };

  const handlePrev = () => {
    if (currentPage > DEFAULT_PAGE) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < total) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-end items-center font-primary font-semibold py-12">
      <Button
        disableAnimation
        aria-label="Previous Button"
        className={prevButtonClass}
        data-testid="prev-button"
        disabled={currentPage === 1}
        startContent={<LeftArrowIcon />}
        variant="light"
        onPress={handlePrev}
      >
        Prev
      </Button>

      <CustomPagination
        aria-label="Pagination"
        data-testid="pagination"
        page={currentPage}
        showControls={false}
        total={total}
        onChange={handlePageChange}
        {...props}
      />

      <Button
        disableAnimation
        aria-label="Next Button"
        className={nextButtonClass}
        data-testid="next-button"
        disabled={currentPage === total}
        endContent={<RightArrowIcon />}
        variant="light"
        onPress={handleNext}
      >
        Next
      </Button>
    </div>
  );
};

export default memo(Pagination);
