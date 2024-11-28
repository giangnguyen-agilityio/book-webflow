import { Spinner } from '@nextui-org/react';
import { cn } from '@nextui-org/theme';

interface ILoadingIndicatorProps {
  size?: 'sm' | 'md' | 'lg';
}

const LoadingIndicator = ({ size = 'lg' }: ILoadingIndicatorProps) => (
  <div
    aria-label="Loading Indicator"
    data-testid="loading-indicator"
    className={cn(
      'fixed inset-0 z-50',
      'flex items-center justify-center',
      'bg-gradient-to-b from-background-primary to-background-primary/80 bg-opacity-75',
    )}
  >
    <Spinner
      data-testid="spinner"
      size={size}
      classNames={{
        circle1: 'border-b-border-default',
        circle2: 'border-b-border-default',
      }}
    />
  </div>
);

export default LoadingIndicator;
