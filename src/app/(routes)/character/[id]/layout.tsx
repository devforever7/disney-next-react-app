import { Metadata } from 'next';
import { getCharacterById } from '@/lib/api/characters';
import { FeaturedCharacters } from '@/app/components/layout/FeaturedCharacters/FeaturedCharacters';

interface IProps {
  params: Promise<{ id: string }>;
}

/**
 * Character detail page layout with dynamic metadata
 * Features:
 * - Dynamic SEO metadata generation based on character data
 * - Error state handling for non-existent characters
 * - Featured characters integration
 * - Shared layout structure for character pages
 * @component
 */

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const character = await getCharacterById(parseInt(resolvedParams.id));
  const characterData = character?.data;

  if (!characterData) {
    return {
      title: 'Character Not Found - Disney Character Explorer',
      description: 'The requested Disney character could not be found.',
    };
  }

  return {
    title: `${characterData.name} - Disney Character Explorer`,
    description: `Explore ${characterData.name}'s profile, including featured films, TV shows, and more.`,
  };
}

export default function CharacterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {' '}
      <main>
        {children}
        <FeaturedCharacters />
      </main>
    </>
  );
}
