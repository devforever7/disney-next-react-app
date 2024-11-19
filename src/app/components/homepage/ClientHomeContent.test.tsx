import { render, screen, fireEvent } from '@testing-library/react';
import { ClientHomeContent } from './ClientHomeContent';
import { mockCharacters } from '@/__mocks__/data/characters';

describe('ClientHomeContent', () => {
  it('renders initial characters', () => {
    render(<ClientHomeContent initialCharacters={mockCharacters} />);
    expect(screen.getByText('Mickey Mouse')).toBeInTheDocument();
    expect(screen.getByText('Donald Duck')).toBeInTheDocument();
  });

  it('filters characters based on search', () => {
    render(<ClientHomeContent initialCharacters={mockCharacters} />);
    const searchInput = screen.getByRole('searchbox');
    fireEvent.change(searchInput, { target: { value: 'Mickey' } });
    expect(screen.getByText('Mickey Mouse')).toBeInTheDocument();
    expect(screen.queryByText('Donald Duck')).not.toBeInTheDocument();
  });

  it('shows no results message with search link when no matches', () => {
    render(<ClientHomeContent initialCharacters={mockCharacters} />);
    const searchInput = screen.getByRole('searchbox');
    fireEvent.change(searchInput, { target: { value: 'Pluto' } });

    // Use a more flexible text matching approach
    expect(
      screen.getByText((content) => content.includes('Characters matching'))
    ).toBeInTheDocument();
    expect(
      screen.getByText('Pluto', { selector: 'strong' })
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes('not in preloaded list'))
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /click here to search all characters/i })
    ).toBeInTheDocument();
  });
});
