'use client';

import ErrorBoundary from '@/app/components/layout/ErrorBoundary/ErrorBoundary';

export default function ProfileError({
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
      message="Failed to load character from id"
    />
  );
}
