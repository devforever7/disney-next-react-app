import { getProfile } from '@/app/actions/profile';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';
import { calculateAge } from '@/lib/utils/date';

/**
 * Server-side rendered profile page
 * Features:
 * - Secure profile data fetching via cookies
 * - Conditional field rendering
 * - Automatic redirect to edit page if no profile exists
 * - Date formatting
 * - Structured profile information display
 * @component
 */
export default async function ProfilePage() {
  const profile = await getProfile();

  if (!profile) {
    redirect('/profile/edit');
  }

  // Format the date
  const formattedDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className={styles.container}>
      <div>
        <h1>
          {profile.firstName} {profile.lastName}
        </h1>
        <p className={styles.lastUpdated}>Last Updated {formattedDate}</p>

        <div className={styles.content}>
          {profile.birthDate && (
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Age:</div>
              <div className={styles.fieldValue}>
                {calculateAge(profile.birthDate)} years old
              </div>
            </div>
          )}

          {profile.city && profile.state && (
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Location:</div>
              <div className={styles.fieldValue}>
                {profile.city}, {profile.state}
              </div>
            </div>
          )}

          {profile.favoriteCharacter && (
            <div className={styles.field}>
              <div className={styles.fieldLabel}>
                Favorite Disney Character:
              </div>
              <div className={styles.fieldValue}>
                {profile.favoriteCharacter}
              </div>
            </div>
          )}

          {profile.favoriteMovie && (
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Favorite Disney Movie:</div>
              <div className={styles.fieldValue}>{profile.favoriteMovie}</div>
            </div>
          )}

          {profile.favoriteDisneyland && (
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Favorite Disneyland:</div>
              <div className={styles.fieldValue}>
                {profile.favoriteDisneyland}
              </div>
            </div>
          )}
        </div>

        <Link href="/profile/edit" className={styles.editButton}>
          Edit Profile
        </Link>
      </div>
    </div>
  );
}
