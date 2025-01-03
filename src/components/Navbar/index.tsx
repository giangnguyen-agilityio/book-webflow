'use client';

import { memo } from 'react';
import Link from 'next/link';
import { NavbarContent, NavbarItem, cn } from '@nextui-org/react';

// Constants
import { NAVIGATION_ITEMS } from '@/constants';

// Types
import { CustomClassType } from '@/types';

interface NavbarProps extends CustomClassType {
  pathname: string;
}

const Navbar = ({ pathname, customClass = '' }: NavbarProps) => (
  <NavbarContent className={cn('gap-6 lg:gap-12', customClass)} justify="end">
    {NAVIGATION_ITEMS.MAIN.map(({ url, label, title }) => {
      const isActive =
        pathname === url || pathname.includes(label.toLowerCase());

      return (
        <NavbarItem key={label}>
          <Link
            href={url}
            title={title}
            className={cn(
              'transition-colors text-foreground hover:text-secondary hover:underline',
              isActive && 'text-secondary underline',
            )}
          >
            {label}
          </Link>
        </NavbarItem>
      );
    })}
  </NavbarContent>
);

export default memo(Navbar);
