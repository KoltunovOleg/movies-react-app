import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieForm from './MovieForm';
import { genres as defaultGenres } from '../../data/genres';

describe('MovieForm Component', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders the form with all fields and default values', () => {
    render(<MovieForm onSubmit={mockOnSubmit} />);
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Release Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Movie URL/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Rating/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Genre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Runtime/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Overview/i)).toBeInTheDocument();

    defaultGenres.forEach((genre) => {
      if (genre !== 'All') {
        expect(screen.getByText(genre)).toBeInTheDocument();
      }
    });
  });

  it('fills in the fields with initialMovieInfo values', () => {
    const initialMovieInfo = {
      title: 'Inception',
      release_date: '2010-07-16',
      poster_path: 'https://example.com/inception.jpg',
      vote_average: 8.8,
      genres: ['Action', 'Sci-Fi'],
      runtime: 148,
      overview: 'A thief who steals corporate secrets...',
    };

    render(<MovieForm initialMovieInfo={initialMovieInfo} onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/Title/i).value).toBe(initialMovieInfo.title);
    expect(screen.getByLabelText(/Release Date/i).value).toBe(initialMovieInfo.release_date);
    expect(screen.getByLabelText(/Movie URL/i).value).toBe(initialMovieInfo.poster_path);
    expect(screen.getByLabelText(/Rating/i).value).toBe(initialMovieInfo.vote_average.toString());
    expect(screen.getByLabelText(/Runtime/i).value).toBe(initialMovieInfo.runtime.toString());
    expect(screen.getByLabelText(/Overview/i).value).toBe(initialMovieInfo.overview);

    expect(screen.getByRole('option', { name: 'Action' }).selected).toBe(true);
    expect(screen.getByRole('option', { name: 'Sci-Fi' }).selected).toBe(true);
  });

  it('calls onSubmit with null when the Reset button is clicked', () => {
    render(<MovieForm onSubmit={mockOnSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: /Reset/i }));
    expect(mockOnSubmit).toHaveBeenCalledWith(null);
  });
});