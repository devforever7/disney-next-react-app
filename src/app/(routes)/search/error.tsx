'use client';

import ErrorBoundary from '@/app/components/layout/ErrorBoundary/ErrorBoundary';

export default function SearchError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorBoundary
      error={error}
      reset={reset}
      message="Something went wrong while searching"
    />
  );
}
