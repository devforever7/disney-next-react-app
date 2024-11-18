import { Metadata } from 'next';

/**
 * Profile section layout component
 * Features:
 * - Static metadata configuration
 * - Consistent layout structure for profile pages
 * - Semantic HTML structure
 * @component
 */

export const metadata: Metadata = {
  title: 'View Your Profile - Disney Character Explorer',
  description: 'View Your Profile for Disney Character Explorer',
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {' '}
      <main>{children}</main>
    </>
  );
}
