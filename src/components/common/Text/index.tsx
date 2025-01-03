import { memo, ReactNode, HTMLAttributes } from 'react';

// Utils
import { cn } from '@/utils';

// Constants
import { TEXT_SIZE_MAP } from '@/constants';

interface TextProps
  extends HTMLAttributes<HTMLParagraphElement | HTMLSpanElement> {
  children: ReactNode;
  size?:
    | 'base'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | '9xl';
  as?: 'span' | 'p';
  className?: string;
  textColor?: string;
  customSize?: string;
  type?: 'nowrap' | 'wrap';
}

const TYPE_CLASSES = {
  nowrap: 'truncate',
  wrap: 'break-words',
};

const Text = ({
  as: Component = 'p',
  children,
  size = 'base',
  type = 'nowrap',
  textColor = 'text-foreground-200',
  customSize = '',
  className = '',
  ...props
}: TextProps) => {
  const fontSizeClass = TEXT_SIZE_MAP[size];

  return (
    <Component
      className={cn(
        'font-normal font-inter',
        customSize || fontSizeClass,
        TYPE_CLASSES[type],
        textColor,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default memo(Text);
