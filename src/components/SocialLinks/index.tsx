import Link from 'next/link';
import { ElementType } from 'react';

// Utils
import { cn } from '@/utils';

// Types
import { CustomClassType } from '@/types';

interface SocialLinksProps extends CustomClassType {
  url: string;
  title: string;
  Icon: ElementType;
}

const SocialLinks = ({
  url,
  title,
  Icon,
  customClass = '',
}: SocialLinksProps) => (
  <Link
    href={url}
    title={title}
    className={cn(
      'w-11 h-11 flex justify-center items-center',
      'bg-background border md:border-none',
      customClass,
    )}
  >
    <Icon customClass="w-5 h-5" />
  </Link>
);

export default SocialLinks;
