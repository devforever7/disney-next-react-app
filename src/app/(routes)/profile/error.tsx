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
      message="Something went wrong with your profile"
    />
  );
}
