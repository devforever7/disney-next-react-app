import { getCharacters } from '@/lib/api/characters';
import { CharacterGrid } from '@/app/components/characters/CharacterGrid/CharacterGrid';
import styles from './FeaturedCharacters.module.css';

export const revalidate = 3600;

/**
 * Featured characters component using Incremental Static Regeneration
 * Features:
 * - Static page generation at build time
 * - Background revalidation every hour
 * - Cached responses between revalidations
 * - Optimized delivery through CDN
 * @component
 */
export async function FeaturedCharacters() {
  const response = await getCharacters(1, 4);
  const characters = response?.data || [];

  return (
    <section className={styles.gridWrapper}>
      <h2 className={styles.featuredTitle}>Featured Characters!</h2>
      <CharacterGrid characters={characters} />
    </section>
  );
}
