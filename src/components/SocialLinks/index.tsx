import Link from 'next/link';
import { ElementType } from 'react';
import { cn } from '@nextui-org/react';

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
      'bg-background-default border md:border-none',
      customClass,
    )}
  >
    <Icon customClass="w-5 h-5" />
  </Link>
);

export default SocialLinks;
