import { Metadata } from 'next';
import { getProfile, updateProfile } from '@/app/actions/profile';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import styles from './page.module.css';

/**
 * Profile edit/create page with form handling
 * Features:
 * - Server action integration for form submission
 * - Form validation and error handling
 * - US states dropdown with type-safe options
 * - Conditional rendering based on existing profile
 * - Accessible form controls
 * @component
 */

export const metadata: Metadata = {
  title: 'Edit/Create Profile - Disney Character Explorer',
  description: 'Edit/Create your Profile for Disney Character Explorer',
};

const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
];

export default async function EditProfilePage() {
  const profile = await getProfile();

  async function handleSubmit(formData: FormData) {
    'use server';

    const result = await updateProfile(formData);
    if (result.success) {
      redirect('/profile');
    }
  }

  return (
    <div className={styles.container}>
      <form action={handleSubmit} className={styles.form} noValidate>
        <div className={styles.formHeader}>
          <h1>{profile ? 'Edit Profile' : 'Create Profile'}</h1>
        </div>

        <fieldset className={styles.fieldset}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="firstName">
                First Name <span aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                defaultValue={profile?.firstName}
                aria-required="true"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="lastName">
                Last Name <span aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                defaultValue={profile?.lastName}
                aria-required="true"
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                defaultValue={profile?.city}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="state">State</label>
              <select
                id="state"
                name="state"
                defaultValue={profile?.state || ''}
                className={styles.select}
              >
                <option value="">Select a state</option>
                {US_STATES.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="favoriteCharacter">Favorite Disney Character</label>
            <input
              type="text"
              id="favoriteCharacter"
              name="favoriteCharacter"
              defaultValue={profile?.favoriteCharacter}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="favoriteMovie">Favorite Disney Movie</label>
            <input
              type="text"
              id="favoriteMovie"
              name="favoriteMovie"
              defaultValue={profile?.favoriteMovie}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="favoriteDisneyland">Favorite Disneyland</label>
            <input
              type="text"
              id="favoriteDisneyland"
              name="favoriteDisneyland"
              defaultValue={profile?.favoriteDisneyland}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="birthDate">Birth Date</label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              max={new Date().toISOString().split('T')[0]}
              defaultValue={profile?.birthDate}
            />
          </div>
        </fieldset>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton}>
            {profile ? 'Update Profile' : 'Create Profile'}
          </button>
          {profile && (
            <Link href="/profile" className={styles.cancelButton}>
              Cancel
            </Link>
          )}
        </div>
      </form>
    </div>
  );
}
