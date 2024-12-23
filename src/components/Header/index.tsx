'use client';

import Link from 'next/link';
import { useState, useCallback } from 'react';
import {
  Navbar as NavbarNextUI,
  NavbarContent,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarItem,
} from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

// Icons
import { LogoIcon } from '@/icons';

// Context
import { useCartContext } from '@/context';

// Constants
import { ROUTES, SOCIAL_LINK_ITEMS } from '@/constants';

// Components
import { CartAction, Navbar, Sidebar, SocialLinks } from '@/components';

const CartModal = dynamic(() => import('@/components/Modal/CartModal'));

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, removeFromCart, updateQuantity, clearCart } =
    useCartContext();

  const formattedSocialLinks = SOCIAL_LINK_ITEMS.slice(0, -1);

  // Memoize handlers to prevent unnecessary re-renders
  const handleCartOpen = useCallback(() => setIsCartOpen(true), []);
  const handleCartClose = useCallback(() => setIsCartOpen(false), []);
  const handleMenuChange = useCallback(
    (isOpen: boolean) => setIsMenuOpen(isOpen),
    [],
  );

  return (
    <>
      <NavbarNextUI
        className="bg-background-primary"
        isMenuOpen={isMenuOpen}
        classNames={{
          wrapper: 'w-full max-w-screen-3xl mx-auto',
        }}
        onMenuOpenChange={handleMenuChange}
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
            <Link href={ROUTES.STORE}>
              <LogoIcon customClass="w-30 h-9 text-text-default" />
            </Link>
          </NavbarBrand>

          {/* Social Network Links */}
          <NavbarItem as="li" className="hidden md:flex gap-2.5">
            {formattedSocialLinks.map(({ url, icon: Icon, title }) => (
              <span key={`social-${title}`} className="text-text-primary">
                <SocialLinks Icon={Icon} title={title} url={url} />
              </span>
            ))}
          </NavbarItem>
        </NavbarContent>

        {/* Navbar */}
        <Navbar
          customClass="hidden mr-0 md:flex lg:mr-4"
          pathname={pathname ?? ''}
        />

        {/* Cart Icon */}
        <NavbarContent className="!flex-grow-0">
          <CartAction onPress={handleCartOpen} />
        </NavbarContent>

        {/* Sidebar Menu */}
        <Sidebar />
      </NavbarNextUI>

      <CartModal
        cartItems={cartItems}
        isOpen={isCartOpen}
        onCheckout={clearCart}
        onClose={handleCartClose}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
    </>
  );
};

export default Header;
