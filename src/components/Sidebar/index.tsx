'use client';

import Link from 'next/link';
import {
  NavbarMenu,
  NavbarMenuItem,
  useNavbarContext,
} from '@nextui-org/react';

// Utils
import { cn } from '@/utils';

// Constants
import { NAVIGATION_ITEMS, SOCIAL_LINK_ITEMS } from '@/constants';

// Components
import { SocialLinks } from '@/components';

const Sidebar = () => {
  const { setIsMenuOpen } = useNavbarContext();

  const handleCloseSidebar = () => {
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 150);
  };

  return (
    <NavbarMenu
      as="aside"
      data-testid="sidebar"
      className={cn(
        'sidebar',
        'bg-gradient-to-b from-background-primary to-background-primary/80',
        'data-[menu-open=true]:backdrop-blur-none',
      )}
      onClick={handleCloseSidebar}
    >
      {/* Navigation Items */}
      {NAVIGATION_ITEMS.MAIN.map(({ url, label, title }) => (
        <NavbarMenuItem
          key={label}
          title={title}
          className={cn(
            'transition-colors text-text-default font-semibold',
            'hover:text-text-tertiary hover:underline',
          )}
        >
          <Link className="w-full" href={url}>
            {label}
          </Link>
        </NavbarMenuItem>
      ))}

      {/* Social Network Links */}
      <li className="flex gap-2.5">
        {SOCIAL_LINK_ITEMS.map(({ url, icon: Icon, title }) => (
          <span key={title} className="text-text-primary">
            <SocialLinks key={title} Icon={Icon} title={title} url={url} />
          </span>
        ))}
      </li>
    </NavbarMenu>
  );
};

export default Sidebar;
