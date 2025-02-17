import { memo } from 'react';
import { Spinner, SpinnerProps } from '@heroui/react';

// Utils
import { cn } from '@/utils';

interface LoadingIndicatorProps extends Omit<SpinnerProps, 'labelColor'> {
  fullScreen?: boolean;
  containerClassName?: string;
  labelClassName?: string;
}

const LoadingIndicator = ({
  label = '',
  fullScreen = true,
  size = 'lg',
  classNames = {},
  containerClassName,
  labelClassName = '',
  ...props
}: LoadingIndicatorProps) => {
  const containerClasses = cn(
    'flex items-center justify-center',
    fullScreen && [
      'fixed inset-0 z-50',
      'bg-background-200',
      'backdrop-blur-sm',
    ],
    containerClassName,
  );

  const customClassNames = {
    circle1: 'border-b-secondary',
    circle2: 'border-b-secondary',
    label: cn('text-secondary', labelClassName),
    ...classNames,
  };

  return (
    <div
      aria-label={label}
      className={containerClasses}
      data-testid="loading-indicator"
      role="status"
    >
      <Spinner
        classNames={customClassNames}
        data-testid="spinner"
        label={label}
        size={size}
        {...props}
      />
    </div>
  );
};

export default memo(LoadingIndicator);
