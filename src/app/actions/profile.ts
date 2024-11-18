/**
 * Server-side profile management using Next.js Server Actions
 * Implements secure cookie-based storage with HTTP-only cookies
 * @module
 */

import { cookies } from 'next/headers';

export interface IProfileData {
  firstName: string;
  lastName: string;
  birthDate?: string;
  city?: string;
  state?: string;
  favoriteCharacter?: string;
  favoriteMovie?: string;
  favoriteDisneyland?: string;
}

/**
 * Retrieves user profile from HTTP-only cookie
 * @returns Promise containing profile data or null if not found/invalid
 */
export async function getProfile(): Promise<IProfileData | null> {
  const cookieStore = await cookies();
  const profileCookie = cookieStore.get('profile');
  if (!profileCookie) return null;

  try {
    return JSON.parse(profileCookie.value);
  } catch {
    return null;
  }
}

/**
 * Updates user profile with form data and stores in HTTP-only cookie
 * Implements validation and secure storage practices
 * @param formData - Form data containing profile information
 * @returns Promise resolving to success status or error message
 */
export async function updateProfile(formData: FormData) {
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const birthDate = formData.get('birthDate') as string;

  if (!firstName || typeof firstName !== 'string') {
    return { error: 'First name is required' };
  }
  if (!lastName || typeof lastName !== 'string') {
    return { error: 'Last name is required' };
  }

  if (birthDate && isNaN(new Date(birthDate).getTime())) {
    return { error: 'Please enter a valid birth date' };
  }

  const profile: IProfileData = {
    firstName,
    lastName,
    birthDate: birthDate || undefined,
    city: (formData.get('city') as string) || undefined,
    state: (formData.get('state') as string) || undefined,
    favoriteCharacter:
      (formData.get('favoriteCharacter') as string) || undefined,
    favoriteMovie: (formData.get('favoriteMovie') as string) || undefined,
    favoriteDisneyland:
      (formData.get('favoriteDisneyland') as string) || undefined,
  };

  const cookieStore = await cookies();
  cookieStore.set('profile', JSON.stringify(profile), {
    httpOnly: true,
    secure:
      process.env.NODE_ENV === 'production' && !process.env.LOCAL_PRODUCTION,
    sameSite: 'strict',
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  });

  return { success: true };
}
