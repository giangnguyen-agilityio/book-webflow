'use client';

import Link from 'next/link';
import { NavbarMenu, NavbarMenuItem } from '@nextui-org/react';

// Constants
import { NAVIGATION_ITEMS, SOCIAL_LINK_ITEMS } from '@/constants';

// Components
import { SocialLinks } from '@/components';

const Sidebar = () => (
  <NavbarMenu as="aside" className="sidebar" data-testid="sidebar">
    {/* Navigation Items */}
    {NAVIGATION_ITEMS.MAIN.map(({ url, label, title }) => (
      <NavbarMenuItem
        key={label}
        className="transition-colors text-text-default font-semibold hover:text-text-tertiary hover:underline"
        title={title}
      >
        <Link className="w-full" href={url}>
          {label}
        </Link>
      </NavbarMenuItem>
    ))}

    {/* Social Network Links */}
    <ul className="flex gap-2.5">
      {SOCIAL_LINK_ITEMS.map(({ url, icon: Icon, title }) => (
        <li key={title} className="text-text-primary">
          <SocialLinks key={title} Icon={Icon} title={title} url={url} />
        </li>
      ))}
    </ul>
  </NavbarMenu>
);

export default Sidebar;
