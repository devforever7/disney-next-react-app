import { cookies } from 'next/headers';
import { getProfile, updateProfile, IProfileData } from './profile';

// Mock next/headers
jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

const originalEnv = process.env;

describe('Profile Actions', () => {
  // Mock cookie store implementation
  const mockCookieStore = {
    get: jest.fn(),
    set: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (cookies as jest.Mock).mockReturnValue(mockCookieStore);
    // Reset process.env before each test
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    // Restore process.env after all tests
    process.env = originalEnv;
  });

  describe('getProfile', () => {
    it('returns null when no profile cookie exists', async () => {
      mockCookieStore.get.mockReturnValue(null);
      const result = await getProfile();
      expect(result).toBeNull();
      expect(mockCookieStore.get).toHaveBeenCalledWith('profile');
    });

    it('returns parsed profile data when valid cookie exists', async () => {
      const mockProfile: IProfileData = {
        firstName: 'John',
        lastName: 'Doe',
        birthDate: '1990-01-01',
      };

      mockCookieStore.get.mockReturnValue({
        value: JSON.stringify(mockProfile),
      });

      const result = await getProfile();
      expect(result).toEqual(mockProfile);
    });

    it('returns null when cookie contains invalid JSON', async () => {
      mockCookieStore.get.mockReturnValue({
        value: 'invalid-json',
      });

      const result = await getProfile();
      expect(result).toBeNull();
    });
  });

  describe('updateProfile', () => {
    const mockFormData = new FormData();

    beforeEach(() => {
      mockFormData.set('firstName', 'John');
      mockFormData.set('lastName', 'Doe');
    });

    it('successfully updates profile with required fields', async () => {
      const result = await updateProfile(mockFormData);

      expect(result).toEqual({ success: true });
      expect(mockCookieStore.set).toHaveBeenCalledWith(
        'profile',
        JSON.stringify({
          firstName: 'John',
          lastName: 'Doe',
        }),
        expect.objectContaining({
          httpOnly: true,
          sameSite: 'strict',
          expires: expect.any(Date),
        })
      );
    });

    it('validates required firstName', async () => {
      mockFormData.delete('firstName');
      const result = await updateProfile(mockFormData);
      expect(result).toEqual({ error: 'First name is required' });
      expect(mockCookieStore.set).not.toHaveBeenCalled();
    });

    it('validates required lastName', async () => {
      mockFormData.delete('lastName');
      const result = await updateProfile(mockFormData);
      expect(result).toEqual({ error: 'Last name is required' });
      expect(mockCookieStore.set).not.toHaveBeenCalled();
    });

    it('validates birth date format', async () => {
      mockFormData.set('birthDate', 'invalid-date');
      const result = await updateProfile(mockFormData);
      expect(result).toEqual({ error: 'Please enter a valid birth date' });
      expect(mockCookieStore.set).not.toHaveBeenCalled();
    });

    it('handles optional fields correctly', async () => {
      mockFormData.set('city', 'New York');
      mockFormData.set('state', 'NY');
      mockFormData.set('favoriteCharacter', 'Mickey Mouse');
      mockFormData.set('birthDate', '1990-01-01');

      const result = await updateProfile(mockFormData);

      expect(result).toEqual({ success: true });
      expect(mockCookieStore.set).toHaveBeenCalledWith(
        'profile',
        expect.stringContaining('"city":"New York"'),
        expect.any(Object)
      );
    });

    it('sets secure cookie in production', async () => {
      process.env = {
        ...process.env,
        NODE_ENV: 'production',
      };

      await updateProfile(mockFormData);

      expect(mockCookieStore.set).toHaveBeenCalledWith(
        'profile',
        expect.any(String),
        expect.objectContaining({
          secure: true,
        })
      );
    });
  });
});
