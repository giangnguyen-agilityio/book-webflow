import Link from 'next/link';

// Constants
import { ImageStore, ROUTER } from '@/constants';

// Components
import { ImageFallback } from '@/components';

export type ErrorFallbackProps = {
  message?: string;
  reset?: () => void;
};

export const ErrorFallback = ({ message = '', reset }: ErrorFallbackProps) => (
  <div className="flex flex-col h-full gap-4 items-center justify-center">
    <ImageFallback
      alt="The error image"
      height={500}
      src={ImageStore.ErrorImage}
      width={500}
    />
    <p className="text-gray-500 text-lg text-center">
      An error occurred. For more help, feel free to reach out to our support
      team.
    </p>

    {message && (
      <p className="text-text-primary font-semibold text-lg text-center whitespace-pre-line">
        Detail error:
        {`\n`}
        <span className="text-text-error/80 font-normal">{message}</span>
      </p>
    )}

    <p className="text-gray-500 text-lg text-center">
      Please&nbsp;
      <span
        className="text-text-primary font-semibold hover:underline cursor-pointer"
        onClick={reset}
      >
        reset the page&nbsp;
      </span>
      or&nbsp;
      <Link
        className="text-text-primary font-semibold hover:underline"
        href={ROUTER.STORE}
      >
        back to home
      </Link>
    </p>
  </div>
);
