import Link from 'next/link';

// Utils
import { cn } from '@/utils';

// Constants
import { ROUTES } from '@/constants';

// Icons
import { NotFoundIcon } from '@/icons';

// Components
import { Button, Heading, Text } from '@/components';

export type NotFoundFallbackProps = {
  title?: string;
  message?: string;
  reset?: () => void;
};

const NotFoundFallback = ({
  title = 'Page not found!!!',
  message = "The page you are looking for doesn't exist. Please try searching for some other page, or return to the website's homepage to find what you're looking for.",
  reset,
}: NotFoundFallbackProps) => (
  <section
    className={cn(
      'background-overlay',
      "bg-[url('/images/background-image.webp')] bg-cover bg-center bg-no-repeat",
    )}
  >
    <div
      className={cn(
        'container w-full h-screen m-auto',
        'flex flex-col items-center justify-center',
      )}
    >
      <NotFoundIcon customClass="w-75 h-44.5 md:w-[471px] md:h-[215px]" />

      <Heading
        as="h1"
        className={cn('mt-8.5 mb-4', 'text-center text-6xl md:text-7xl')}
        textColor="text-text-primary"
      >
        {title}
      </Heading>

      <Text
        className="mb-10 text-center text-base md:text-lg"
        textColor="text-text-secondary"
        type="wrap"
      >
        {message}
      </Text>

      <Button
        aria-label="Back to home button"
        as={Link}
        color="default"
        href={ROUTES.STORE}
        variant="solid"
        onPress={reset}
      >
        Back to home
      </Button>
    </div>
  </section>
);

export default NotFoundFallback;
