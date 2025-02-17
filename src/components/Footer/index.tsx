import Link from 'next/link';

// Utils
import { cn } from '@/utils';

// Constants
import { NAVIGATION_ITEMS, ROUTES, SOCIAL_LINK_ITEMS } from '@/constants';

// Icons
import { LogoIcon, HorizontalDotsIcon } from '@/icons';

// Components
import { Text, Heading, SocialLinks } from '@/components';

const Footer = () => {
  return (
    <footer className="bg-background-200 text-foreground">
      <div
        className={cn(
          'w-full max-w-screen-3xl mx-auto',
          'px-6 pb-6 pt-6 md:pt-21',
        )}
      >
        <div className="grid gap-12 grid-cols-1 lg:grid-cols-[auto_1fr]">
          {/* Main Section */}
          <div className="left-column flex-shrink-0 space-y-6">
            <div className="flex items-center space-x-2">
              <Link href={ROUTES.STORE}>
                <LogoIcon customClass="w-30 h-9 text-foreground" />
              </Link>
            </div>

            <ul className="flex space-x-4">
              {SOCIAL_LINK_ITEMS.map(({ url, icon: Icon, title }) => (
                <li key={title} className="border border-secondary">
                  <SocialLinks
                    key={title}
                    Icon={Icon}
                    title={title}
                    url={url}
                    customClass={cn(
                      'p-2 transition-colors',
                      'bg-background-200 hover:bg-secondary/60',
                    )}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div
            className={cn(
              'right-column gap-16',
              'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
              'w-full lg:w-auto lg:max-w-[867px] lg:ml-auto',
            )}
          >
            {/* Explore Section */}
            <div>
              <Heading
                className="mb-6 font-cardo font-bold text-xl md:text-3xl"
                textColor="text-foreground"
              >
                Explore
              </Heading>
              <ul className="space-y-4">
                {NAVIGATION_ITEMS.EXPLORE.map(({ url, label, title }) => (
                  <li key={label} title={title}>
                    <Link className="flex items-center space-x-2" href={url}>
                      <HorizontalDotsIcon customClass="w-6 h-6 text-secondary" />
                      <Text
                        as="span"
                        className="text-foreground-500 hover:text-secondary"
                        size="md"
                      >
                        {label}
                      </Text>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Utility Section */}
            <div>
              <Heading
                className="mb-6 font-cardo font-bold text-xl md:text-3xl"
                textColor="text-foreground"
              >
                Utility Pages
              </Heading>
              <ul className="space-y-4">
                {NAVIGATION_ITEMS.UTILITY.map(({ url, label, title }) => (
                  <li key={label} title={title}>
                    <Link
                      className="flex items-center space-x-2 hover:text-secondary"
                      href={url}
                    >
                      <HorizontalDotsIcon customClass="w-6 h-6 text-secondary" />
                      <Text
                        as="span"
                        className="text-foreground-500 hover:text-secondary"
                        size="md"
                      >
                        {label}
                      </Text>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Keep in Touch Section */}
            <div>
              <Heading
                className="mb-6 font-cardo font-bold text-xl md:text-3xl"
                textColor="text-foreground"
              >
                Keep in Touch
              </Heading>
              <div className="space-y-4">
                <div>
                  <Text
                    className="mb-2 font-cardo font-bold"
                    size="md"
                    textColor="text-foreground"
                  >
                    Address :
                  </Text>
                  <Text size="md" textColor="text-foreground-500" type="wrap">
                    {`24A Kingston St, Los Vegas \n NC 28202, USA.`}
                  </Text>
                </div>
                <div>
                  <Text
                    className="mb-2 font-cardo font-bold"
                    size="md"
                    textColor="text-foreground"
                  >
                    Mail :
                  </Text>
                  <Link
                    className="break-words text-md text-foreground-500 hover:text-secondary"
                    href="mailto:support@doctors.com"
                  >
                    support@doctors.com
                  </Link>
                </div>
                <div>
                  <Text
                    className="mb-2 font-cardo font-bold"
                    size="md"
                    textColor="text-foreground"
                  >
                    Phone :
                  </Text>
                  <Link
                    className="text-md text-foreground-500 hover:text-secondary"
                    href="tel:+22123456790"
                  >
                    (+22) 123 - 4567 - 900
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-19 pt-4.5 border-t border-foreground-500 text-center">
          <Text textColor="text-foreground-500" type="wrap">
            Copyright © 2024, VictorFlow - All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
