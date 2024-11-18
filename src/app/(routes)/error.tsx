'use client';

import ErrorBoundary from '@/app/components/ui/ErrorBoundary/ErrorBoundary';

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
      message="Failed to prefetch 8 characters on server"
    />
  );
}
