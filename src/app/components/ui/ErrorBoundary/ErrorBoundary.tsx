/**
 * Generic error boundary component used across the application
 * Provides consistent error handling and user recovery options
 * Used in various error pages where errors can be safely thrown and surfaced:
 * - Search errors (API failures, invalid queries)
 * - Profile errors (cookie issues, validation)
 * - Character detail errors (404s, API failures)
 * - Home page errors (initial data fetch failures)
 *
 * Features:
 * - Consistent error message display
 * - Error logging to console
 * - Retry functionality
 * - Custom error messages per usage
 * - TypeScript support for Next.js error types
 *
 * @component
 * @param {Object} props
 * @param {Error & { digest?: string }} props.error - Error object with optional Next.js digest
 * @param {() => void} props.reset - Function to retry the failed operation
 * @param {string} [props.message] - Optional custom error message
 */

'use client';

import { useEffect } from 'react';
import styles from '@/app/components/ui/ErrorBoundary/ErrorBoundary.module.css';

interface IErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
  message?: string;
}

export default function ErrorBoundary({
  error,
  reset,
  message = 'Something went wrong',
}: IErrorBoundaryProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.error}>
      <h1>{message}</h1>
      <pre>{error.message}</pre>
      <button onClick={reset} className={styles.retryButton}>
        Try again
      </button>
    </div>
  );
}
