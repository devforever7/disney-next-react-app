import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it('renders with default placeholder', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    expect(
      screen.getByPlaceholderText('Search Disney characters...')
    ).toBeInTheDocument();
  });

  it('uses custom placeholder based on screen size', () => {
    // Mock window.innerWidth
    global.innerWidth = 400;
    global.dispatchEvent(new Event('resize'));

    render(
      <SearchBar
        onSearch={mockOnSearch}
        placeholder={{ mobile: 'Search...', desktop: 'Find characters...' }}
      />
    );

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('calls onSearch when input value changes', () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'Mickey' } });

    expect(mockOnSearch).toHaveBeenCalledWith('Mickey');
  });

  it('displays initial value when provided', () => {
    render(<SearchBar onSearch={mockOnSearch} initialValue="Donald" />);

    expect(screen.getByRole('searchbox')).toHaveValue('Donald');
  });

  it('renders Disney logo', () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    expect(screen.getByAltText('Disney Logo')).toBeInTheDocument();
  });
});
