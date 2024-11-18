import { Metadata } from 'next';
import { headers } from 'next/headers';
import { FeaturedCharacters } from '@/app/components/layout/FeaturedCharacters/FeaturedCharacters';

/**
 * Server search page layout with dynamic metadata generation
 * Features:
 * - Canonical URL and other SEO-optimized metadata
 * - Featured characters integration
 * - Layout structure for search pages
 * @component
 */

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get('host') || '';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const canonicalUrl = `${protocol}://${host}/search`;

  return {
    title: 'Search Results',
    description: 'Search for Disney characters',
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

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
