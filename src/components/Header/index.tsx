'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Navbar as NavbarNextUI,
  NavbarContent,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarItem,
} from '@nextui-org/react';
import { usePathname } from 'next/navigation';

// Icons
import { LogoIcon } from '@/icons';

// Constants
import { SOCIAL_LINK_ITEMS } from '@/constants';

// Components
import { CartAction, Navbar, Sidebar, SocialLinks } from '@/components';

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const formattedSocialLinks = SOCIAL_LINK_ITEMS.slice(0, -1);

  return (
    <NavbarNextUI
      className="bg-background-primary"
      isMenuOpen={isMenuOpen}
      classNames={{
        wrapper: 'w-full max-w-screen-3xl mx-auto',
      }}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Hamburger Button */}
      <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          as="li"
          className="text-text-default"
        />
      </NavbarContent>

      <NavbarContent justify="center">
        {/* Logo Website */}
        <NavbarBrand aria-label="Logo website" as="li">
          <Link href="/">
            <LogoIcon customClass="w-30 h-9 text-text-default" />
          </Link>
        </NavbarBrand>

        {/* Social Network Links */}
        <NavbarItem as="li" className="hidden md:flex gap-2.5">
          {formattedSocialLinks.map(({ url, icon: Icon, title }) => (
            <span key={title} className="text-text-primary">
              <SocialLinks key={title} Icon={Icon} title={title} url={url} />
            </span>
          ))}
        </NavbarItem>
      </NavbarContent>

      {/* Navbar */}
      <Navbar customClass="hidden mr-0 md:flex lg:mr-4" pathname={pathname} />

      {/* Cart Icon */}
      <NavbarContent className="!flex-grow-0">
        <CartAction />
      </NavbarContent>

      {/* Sidebar Menu */}
      <Sidebar />
    </NavbarNextUI>
  );
};

export default Header;
