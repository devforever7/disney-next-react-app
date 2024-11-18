import { render, screen } from '@testing-library/react';
import CharacterPage from './page';
import { getCharacterById } from '@/lib/api/characters';
import { notFound } from 'next/navigation';

// Mock the API function
jest.mock('@/lib/api/characters', () => ({
  getCharacterById: jest.fn(),
}));

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

describe('CharacterPage', () => {
  const mockCharacter = {
    data: {
      _id: 1,
      name: 'Mickey Mouse',
      imageUrl: '/mickey.jpg',
      films: ['Fantasia', 'Fun and Fancy Free'],
      shortFilms: [`Mickey's Christmas Carol`],
      tvShows: ['Mickey Mouse Clubhouse'],
      updatedAt: '2024-03-15T12:00:00Z',
      sourceUrl: 'https://disney.com/mickey',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders character details correctly', async () => {
    (getCharacterById as jest.Mock).mockResolvedValue(mockCharacter);

    const props = {
      params: Promise.resolve({ id: '1' }),
    };

    const page = await CharacterPage(props);
    render(page);

    // Verify main content
    expect(screen.getByText('Mickey Mouse')).toBeInTheDocument();
    expect(screen.getByText('Featured Films')).toBeInTheDocument();
    expect(screen.getByText('Fantasia')).toBeInTheDocument();
    expect(screen.getByText('Fun and Fancy Free')).toBeInTheDocument();

    // Verify sections
    expect(screen.getByText('Short Films')).toBeInTheDocument();
    expect(screen.getByText(`Mickey's Christmas Carol`)).toBeInTheDocument();
    expect(screen.getByText('TV Shows')).toBeInTheDocument();
    expect(screen.getByText('Mickey Mouse Clubhouse')).toBeInTheDocument();

    // Verify external link
    const exploreLink = screen.getByText('Explore More Character Details');
    expect(exploreLink).toHaveAttribute('href', 'https://disney.com/mickey');
    expect(exploreLink).toHaveAttribute('target', '_blank');
    expect(exploreLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('handles missing character data', async () => {
    (getCharacterById as jest.Mock).mockResolvedValue({ data: null });

    const props = {
      params: Promise.resolve({ id: '999' }),
    };

    try {
      await CharacterPage(props);
      fail('Expected notFound to throw');
    } catch {
      // Expected to throw since notFound() is called
    }

    expect(notFound).toHaveBeenCalled();
  });

  it('renders character without optional fields', async () => {
    const minimalCharacter = {
      data: {
        _id: 2,
        name: 'Donald Duck',
        imageUrl: '/donald.jpg',
        films: [],
        shortFilms: [],
        tvShows: [],
        updatedAt: '2024-03-15T12:00:00Z',
      },
    };

    (getCharacterById as jest.Mock).mockResolvedValue(minimalCharacter);

    const props = {
      params: Promise.resolve({ id: '2' }),
    };

    const page = await CharacterPage(props);
    render(page);

    expect(screen.getByText('Donald Duck')).toBeInTheDocument();
    expect(screen.queryByText('Featured Films')).not.toBeInTheDocument();
    expect(screen.queryByText('Short Films')).not.toBeInTheDocument();
    expect(screen.queryByText('TV Shows')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Explore More Character Details')
    ).not.toBeInTheDocument();
  });
});
