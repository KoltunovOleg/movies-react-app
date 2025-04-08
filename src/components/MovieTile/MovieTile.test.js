// ComponentName.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MovieTile from './MovieTile';

describe('MovieTile Component', () => {
  const mockMovie = {
    poster_path: 'https://example.com/poster.jpg',
    title: 'Example Movie',
    release_date: '2023-01-01',
    genres: ['Action', 'Adventure'],
  };

  const mockOnClick = jest.fn();

  it('renders movie details correctly', () => {
    render(<MovieTile movie={mockMovie} onClick={mockOnClick} />);

    expect(screen.getByText('Example Movie')).toBeInTheDocument();

    expect(screen.getByText('2023')).toBeInTheDocument();

    expect(screen.getByText('Action, Adventure')).toBeInTheDocument();

    const image = screen.getByAltText('Example Movie poster');
    expect(image).toHaveAttribute('src', 'https://example.com/poster.jpg');
  });

  it('calls onClick handler when clicked', () => {
    render(<MovieTile movie={mockMovie} onClick={mockOnClick} />);

    const movieTile = screen.getByRole('img').closest('.movie-tile');
    userEvent.click(movieTile);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(mockMovie);
  });

  it('does not throw an error if onClick is not provided', () => {
    render(<MovieTile movie={mockMovie} />);

    const movieTile = screen.getByRole('img').closest('.movie-tile');
    expect(() => userEvent.click(movieTile)).not.toThrow();
  });
});