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
    runtime: '120 mins',
    overview: 'An example movie overview.',
    rating: 4.5,
  };

  const mockOnClick = jest.fn();

  it('renders movie details correctly', () => {
    render(<MovieTile movie={mockMovie} onClick={mockOnClick} />);
    const image = screen.getByAltText('Example Movie poster');

    expect(screen.getByText('Example Movie')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('Action, Adventure')).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/poster.jpg');
  });

  it('calls onClick handler when the movie tile is clicked', async () => {
    render(<MovieTile movie={mockMovie} onClick={mockOnClick} />);

    const movieTile = screen.getByTestId('movie-tile');
    await userEvent.click(movieTile);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(mockMovie);
  });

  it('opens the selector when ButtonDots is clicked', async () => {
    const { container } = render(<MovieTile movie={mockMovie} onClick={mockOnClick} />);

    const buttonDots = container.querySelector('.button-dots');
    await userEvent.click(buttonDots);

    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });
});