'use client';

import { Input } from '@nextui-org/react';
import { cn } from '@nextui-org/theme';

// Icons
import { LogoIcon } from '@/icons';

// Components
import { Button, Text, Heading } from '@/components';

const ComingSoon = () => (
  <section className="background-overlay bg-gradient-to-b from-background-primary to-background-primary/80">
    <div
      className={cn(
        'container min-h-screen m-auto gap-6 font-inter',
        'flex flex-col justify-center items-center',
      )}
    >
      <h1 className="w-55 lg:w-75 h-full">
        <LogoIcon customClass="w-full h-full text-text-default" />
      </h1>

      <Heading
        className="font-cardo font-semibold text-7xl md:text-9xl"
        textColor="text-text-tertiary"
      >
        Coming Soon
      </Heading>

      <Text
        className="text-center text-base md:text-md"
        textColor="text-text-default"
        type="wrap"
      >
        We&apos;re working hard to bring you something amazing.
        <br /> Stay tuned for updates!
      </Text>

      <div className="flex flex-col justify-center items-center space-y-6">
        <Text className="text-base" textColor="text-text-default" type="wrap">
          Be the first to hear when we go live:
        </Text>

        <div className="flex max-w-md mx-auto gap-3">
          <Input placeholder="Enter your email" type="email" />

          <Button
            className="font-semibold"
            color="primary"
            radius="md"
            variant="bordered"
          >
            Notify Me
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default ComingSoon;
