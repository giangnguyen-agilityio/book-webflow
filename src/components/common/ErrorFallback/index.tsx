import Link from 'next/link';
import { cn } from '@nextui-org/theme';

// Constants
import { ImageStore, ROUTES } from '@/constants';

// Components
import { Button, ImageFallback, Text } from '@/components';

export type ErrorFallbackProps = {
  message?: string;
  reset?: () => void;
};

const ErrorFallback = ({ message = '', reset }: ErrorFallbackProps) => (
  <div
    className={cn(
      'flex flex-col',
      'gap-3 items-center justify-center',
      'py-10 md:py-20',
    )}
  >
    <ImageFallback
      alt="The error image"
      height={500}
      sizes="(max-width: 425px) 33vw, 500px"
      src={ImageStore.ErrorImage}
      width={500}
    />

    <Text
      className="text-center text-medium md:text-base"
      textColor="text-gray-500"
      type="wrap"
    >
      An error occurred. For more help, feel free to reach out to our support
      team.
    </Text>

    {message && (
      <Text
        className="font-semibold text-center text-lg md:text-xl"
        textColor="text-text-primary"
        type="wrap"
      >
        Error details:
        <br />
        <Text
          as="span"
          className="max-w-lg text-medium md:text-base"
          textColor="text-text-error/80"
          type="wrap"
        >
          {message}
        </Text>
      </Text>
    )}

    <Text
      className="text-center text-md md:text-lg"
      textColor="text-gray-500"
      type="wrap"
    >
      Please&nbsp;
      <Button
        disableAnimation
        className={cn(
          'p-0 min-w-fit bg-transparent',
          'font-inter font-semibold',
          'text-md md:text-lg text-text-primary',
          'hover:underline underline-offset-4',
        )}
        onPress={reset}
      >
        reset the page&nbsp;
      </Button>
      or&nbsp;
      <Link
        href={ROUTES.STORE}
        className={cn(
          'text-text-primary font-semibold',
          'text-md md:text-lg',
          'transition-all hover:underline underline-offset-4',
        )}
      >
        back to home
      </Link>
    </Text>
  </div>
);

export default ErrorFallback;
