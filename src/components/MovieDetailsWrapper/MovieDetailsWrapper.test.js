import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import MovieDetailsWrapper from './MovieDetailsWrapper';
import { API_URL } from '../../constants';

jest.mock('../MovieDetails/MovieDetails', () => ({ movie }) => (
  <div data-testid="movie-details">{movie.title}</div>
));

describe('MovieDetailsWrapper', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders loading state initially', () => {
    // Mock fetch to avoid making an actual API call
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ title: 'Mock Movie' }),
      })
    );

    render(
      <MemoryRouter initialEntries={['/movies/123']}>
        <Routes>
          <Route path="/movies/:movieId" element={<MovieDetailsWrapper />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('fetches and displays movie details', async () => {
    const mockMovie = { title: 'Mock Movie' };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockMovie),
      })
    );

    render(
      <MemoryRouter initialEntries={['/movies/123']}>
        <Routes>
          <Route path="/movies/:movieId" element={<MovieDetailsWrapper />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('movie-details')).toBeInTheDocument();
    });

    expect(screen.getByTestId('movie-details')).toHaveTextContent('Mock Movie');
    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/123`);
  });

  it('handles fetch errors gracefully', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Failed to fetch movie details'))
    );

    render(
      <MemoryRouter initialEntries={['/movies/123']}>
        <Routes>
          <Route path="/movies/:movieId" element={<MovieDetailsWrapper />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/123`);
  });
});