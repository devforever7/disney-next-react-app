import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
  const mockReset = jest.fn();
  const mockError = new Error('Test error message');
  const defaultProps = {
    error: mockError,
    reset: mockReset,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock console.error to prevent test output noise
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders error message correctly', () => {
    render(<ErrorBoundary {...defaultProps} />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('renders custom error message when provided', () => {
    const customMessage = 'Custom error message';
    render(<ErrorBoundary {...defaultProps} message={customMessage} />);

    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it('calls reset function when retry button is clicked', () => {
    render(<ErrorBoundary {...defaultProps} />);

    const retryButton = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(retryButton);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('logs error to console', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    render(<ErrorBoundary {...defaultProps} />);

    expect(consoleSpy).toHaveBeenCalledWith(mockError);
  });

  it('handles error with digest property', () => {
    const errorWithDigest = new Error('Test error message');
    Object.assign(errorWithDigest, { digest: 'test-digest-123' });

    render(<ErrorBoundary error={errorWithDigest} reset={mockReset} />);

    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });
});
