import { getCharacters } from '@/lib/api/characters';
import { CharacterGrid } from '@/app/components/characters/CharacterGrid/CharacterGrid';
import styles from './FeaturedCharacters.module.css';

/**
 * Server component that fetches and displays featured characters
 * Implements server-side data fetching for optimal performance
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
