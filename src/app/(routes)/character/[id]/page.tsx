import { getCharacterById } from '@/lib/api/characters';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

interface IProps {
  params: Promise<{ id: string }>;
}

/**
 * Server-side rendered character detail page
 * Features:
 * - Dynamic route handling with [id] parameter
 * - Optimized image loading with next/image (priority above the fold loading)
 * - Semantic HTML structure with accessibility
 * - External link handling with security attributes
 * @component
 * @param {Object} props - Component props containing route parameters
 */
export default async function CharacterPage(props: IProps) {
  const { params } = props;
  const resolvedParams = await Promise.resolve(params);
  const character = await getCharacterById(parseInt(resolvedParams.id));
  const characterData = character?.data;

  if (!characterData) {
    notFound();
  }

  // Format the date
  const formattedDate = new Date(characterData.updatedAt).toLocaleDateString(
    'en-US',
    {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <Image
            src={characterData.imageUrl}
            alt=""
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 500px"
            priority
          />
        </div>

        <div className={styles.details}>
          <div className={styles.header}>
            <h1 className={styles.name}>{characterData.name}</h1>
            <p className={styles.lastUpdated}>Last Updated {formattedDate}</p>
          </div>

          {characterData.films?.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Featured Films</h2>
              <ul>
                {characterData.films.map((film) => (
                  <li key={film}>{film}</li>
                ))}
              </ul>
            </section>
          )}

          {characterData.shortFilms?.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Short Films</h2>
              <ul>
                {characterData.shortFilms.map((film) => (
                  <li key={film}>{film}</li>
                ))}
              </ul>
            </section>
          )}

          {characterData.tvShows?.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>TV Shows</h2>
              <ul>
                {characterData.tvShows.map((show) => (
                  <li key={show}>{show}</li>
                ))}
              </ul>
            </section>
          )}

          {characterData.sourceUrl && (
            <Link
              href={characterData.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.exploreButton}
            >
              Explore More Character Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
