import Link from 'next/link';
import { cn } from '@nextui-org/theme';

// Constants
import { ROUTER } from '@/constants';

// Icons
import { NotFoundIcon } from '@/icons';

// Components
import { Button } from '@/components';

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
      'w-full h-screen',
      'flex flex-col items-center justify-center',
      "bg-[url('/images/background-image.webp')] bg-cover bg-center bg-no-repeat",
    )}
  >
    <NotFoundIcon customClass="w-75 h-44.5 md:w-[471px] md:h-[215px]" />

    <h2
      className={cn(
        'font-cardo font-bold text-center text-text-primary',
        'mt-8.5 mb-4',
        'text-6xl md:text-7xl',
      )}
    >
      {title}
    </h2>

    <p
      className={cn(
        'font-inter font-normal',
        'text-text-secondary text-center mb-10',
        'text-base md:text-lg',
      )}
    >
      {message}
    </p>

    <Button
      aria-label="Back to home button"
      as={Link}
      color="primary"
      href={ROUTER.STORE}
      onPress={reset}
    >
      Back to home
    </Button>
  </section>
);

export default NotFoundFallback;
