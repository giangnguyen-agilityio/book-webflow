import Link from 'next/link';
import { ElementType } from 'react';
import { cn } from '@nextui-org/react';

interface SocialLinksProps {
  url: string;
  title: string;
  Icon: ElementType;
}

const SocialLinks = ({ url, title, Icon }: SocialLinksProps) => (
  <Link
    href={url}
    title={title}
    className={cn(
      'w-11 h-11 flex justify-center items-center',
      'bg-background-default border md:border-none',
    )}
  >
    <Icon customClass="w-5 h-5" />
  </Link>
);

export default SocialLinks;
