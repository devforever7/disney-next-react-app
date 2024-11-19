import { getCharacters } from '@/lib/api/characters';
import styles from './page.module.css';
import { ClientHomeContent } from '@/app/components/home/ClientHomeContent';
import { FeaturedCharacters } from '@/app/components/layout/FeaturedCharacters/FeaturedCharacters';

/**
 * Server-side rendered home page
 * Features:
 * - Initial character data fetching
 * - Hybrid rendering with client/server components
 * - Featured characters integration
 * - Main entry point for the application
 * @component
 */

export default async function Home() {
  const response = await getCharacters(4, 8);
  const initialCharacters = response?.data || [];

  return (
    <>
      <main>
        <h1 className={styles.title}>Disney Character Explorer</h1>
        <ClientHomeContent initialCharacters={initialCharacters} />
        <FeaturedCharacters />
      </main>
    </>
  );
}
