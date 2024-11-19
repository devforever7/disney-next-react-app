import Image from 'next/image';
import Link from 'next/link';
import styles from './CharacterCard.module.css';

interface ICharacterCardProps {
  id: number;
  name: string;
  imageUrl: string;
  films: string[];
}

/**
 * Reusable character card component with optimized image loading
 * Features responsive design and semantic HTML structure
 * @component
 * @param {Object} props - Component props
 * @param {number} props.id - Character ID
 * @param {string} props.name - Character name
 * @param {string} props.imageUrl - Character image URL
 * @param {string[]} props.films - List of films featuring the character
 */
export const CharacterCard = ({
  id,
  name,
  imageUrl,
  films,
}: ICharacterCardProps) => {
  return (
    <article className={styles.card} aria-label={`Card for ${name}`}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={`Portrait of ${name}`}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className={styles.content}>
        <div className={styles.name}>{name}</div>
        <div className={styles.stats}>
          <div className={styles.category}>
            <strong>Featured Films</strong>
            <p className={styles.truncate}>{films.join(', ') || 'None'}</p>
          </div>
        </div>
        <Link
          href={`/character/${id}`}
          className={styles.viewProfile}
          aria-label={`View ${name}'s full profile`}
        >
          VIEW PROFILE
        </Link>
      </div>
    </article>
  );
};
