'use client';

import { Divider, Input } from '@nextui-org/react';
import { cn } from '@nextui-org/theme';

// Components
import { Heading, Text, Button } from '@/components';

const NewsletterSignup = () => (
  <section
    className={cn(
      'container bg-background-default mx-auto',
      'py-20 md:py-30 lg:py-40',
    )}
  >
    <div
      className={cn(
        'flex flex-col justify-center items-center',
        'py-14 md:py-30 lg:py-30 px-10 sm:px-20 md:px-30 3xl:px-[230px]',
        'font-inter text-center bg-background-tertiary',
      )}
    >
      <Heading
        className="font-cardo font-bold text-5xl md:text-8xl"
        textColor="text-text-primary"
      >
        Read a free chapter
      </Heading>

      <Divider className="w-13.75 mt-4 mb-5 bg-background-primary mx-auto" />

      <Text
        type="wrap"
        className={cn(
          '!leading-normal',
          'font-normal max-w-[657px]',
          'text-text-primary text-small md:text-base lg:text-lg',
        )}
      >
        Making this the first true value generator on the Internet. It of over
        200 Latin words, combined with a handful.
      </Text>

      <form
        className={cn(
          'flex gap-3 flex-col sm:flex-row',
          'w-full mx-auto mt-10',
        )}
      >
        <Input
          aria-label="Email"
          className="min-w-fit 3xl:min-w-[530px] text-base"
          placeholder="Your Email ID..."
          radius="none"
          type="email"
          classNames={{
            inputWrapper: 'md:min-h-16',
          }}
        />

        <Button
          color="secondary"
          className={cn(
            'font-cardo font-bold text-text-default',
            'md:h-auto px-auto md:px-20 3xl:px-27',
          )}
        >
          Subscribe
        </Button>
      </form>
    </div>
  </section>
);

export default NewsletterSignup;
