'use client';

import {
  Skeleton as SkeletonNextUI,
  SkeletonProps as SkeletonNextUIProps,
} from '@heroui/react';

// Utils
import { cn } from '@/utils';

export interface SkeletonProps extends SkeletonNextUIProps {
  className?: string;
}

export const BaseSkeleton = ({ className, ...props }: SkeletonProps) => (
  <SkeletonNextUI
    className={cn('bg-background-200/20 rounded-md', className)}
    {...props}
  />
);

export default BaseSkeleton;
