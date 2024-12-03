'use client';

import {
  Skeleton as SkeletonNextUI,
  SkeletonProps as SkeletonNextUIProps,
} from '@nextui-org/react';
import { cn } from '@nextui-org/theme';

export interface SkeletonProps extends SkeletonNextUIProps {
  className?: string;
}

export const BaseSkeleton = ({ className, ...props }: SkeletonProps) => (
  <SkeletonNextUI
    className={cn('bg-background-primary/20 rounded-md', className)}
    {...props}
  />
);

export default BaseSkeleton;
