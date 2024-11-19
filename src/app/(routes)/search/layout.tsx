import { Metadata } from 'next';
import { FeaturedCharacters } from '@/app/components/layout/FeaturedCharacters/FeaturedCharacters';

/**
 * Server search page layout with metadata
 * Features:
 * - Basic SEO metadata
 * - Featured characters integration
 * - Layout structure for search pages
 * @component
 */

export const metadata: Metadata = {
  title: 'Search Results - Disney Character Explorer',
  description: 'Search for Disney characters',
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      {children}
      <FeaturedCharacters />
    </main>
  );
}
