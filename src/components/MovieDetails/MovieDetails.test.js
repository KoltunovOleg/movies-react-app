import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieDetails from './MovieDetails';

describe('MovieDetails Component', () => {
  const mockMovie = {
    poster_path: 'https://example.com/poster.jpg',
    title: 'Example Movie',
    release_date: '2023-01-01',
    genres: ['Action', 'Adventure'],
    overview: 'This is an example movie overview.',
    runtime: 120,
    vote_average: 8.5,
  };

  const mockOnClose = jest.fn();

  it('renders movie details correctly', () => {
    render(<MovieDetails movie={mockMovie} onClose={mockOnClose} />);

    expect(screen.getByAltText('Example Movie poster')).toHaveAttribute('src', mockMovie.poster_path);
    expect(screen.getByText('Example Movie')).toBeInTheDocument();
    expect(screen.getByText('Action, Adventure')).toBeInTheDocument();
    expect(screen.getByText('Release Date: 2023-01-01')).toBeInTheDocument();
    expect(screen.getByText('Runtime: 120 minutes')).toBeInTheDocument();
    expect(screen.getByText('Rating: 8.5')).toBeInTheDocument();
    expect(screen.getByText('This is an example movie overview.')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    render(<MovieDetails movie={mockMovie} onClose={mockOnClose} />);

    const closeButton = screen.getByRole('button', { name: /×/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});