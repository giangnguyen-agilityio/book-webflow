'use client';

// Types
import { PageErrorProps } from '@/types';

// Components
import { ErrorFallback } from '@/components';

export default function ArticleDetailsError({ error, reset }: PageErrorProps) {
  return <ErrorFallback message={error.message} reset={reset} />;
}
