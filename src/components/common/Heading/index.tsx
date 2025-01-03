import { memo, ReactNode, HTMLAttributes } from 'react';

// Utils
import { cn } from '@/utils';

// Constants
import { HEADING_SIZE_MAP } from '@/constants';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  size?: 'base' | 'sm' | 'md' | 'lg' | 'xl';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  textColor?: string;
  customSize?: string;
}

const Heading = ({
  children,
  as: Component = 'h2',
  className = '',
  size = 'base',
  customSize = '',
  textColor = 'text-primary',
  ...props
}: HeadingProps) => {
  const ariaLevels: { [key: string]: number } = {
    h1: 1,
    h2: 2,
    h3: 3,
    h4: 4,
    h5: 5,
    h6: 6,
  };

  const ariaLevel = ariaLevels[Component];
  const fontSizeClass = HEADING_SIZE_MAP[size];

  return (
    <Component
      aria-level={ariaLevel}
      className={cn(
        'font-bold font-cardo',
        textColor,
        customSize || fontSizeClass,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default memo(Heading);
