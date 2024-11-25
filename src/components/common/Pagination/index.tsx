'use client';

import React, { memo } from 'react';
import {
  extendVariants,
  Pagination as PaginationNextUI,
  PaginationProps as NextUIPaginationProps,
} from '@nextui-org/react';
import { cn } from '@nextui-org/theme';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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
        item: cn(
          'bg-transparent shadow-none',
          'data-[active=true]:bg-background-primary data-[active=true]:text-text-primary',
          '[&[data-hover=true]:not([data-active=true])]:text-text-default dark:[&[data-hover=true]:not([data-active=true])]:bg-background-primary',
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
      'text-base p-0 font-semibold bg-transparent data-[hover=true]:bg-transparent',
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
    <div className="flex justify-center items-center font-primary font-semibold space-x-2 p-2">
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
