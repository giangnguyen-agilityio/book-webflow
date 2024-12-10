'use client';

// Components
import { ErrorFallback } from '@/components';

// Types
import { PageErrorProps } from '@/types';

export default function GlobalError({ error, reset }: PageErrorProps) {
  return (
    <html lang="en">
      <body>
        <ErrorFallback message={error.message} reset={reset} />
      </body>
    </html>
  );
}
