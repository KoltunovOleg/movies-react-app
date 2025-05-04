import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom';
import MovieListPage from './MovieListPage';
import moviesListMock from '../../data/movies.json';
import useFetchMovies from '../../hooks/useFetchMovies';

// Mock useNavigate globally
import { useNavigate } from 'react-router';

// Mock useFetchMovies
jest.mock('../../hooks/useFetchMovies', () => jest.fn());
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: jest.fn(),
}));

describe('MovieListPage Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Ensure mockNavigate is used
    jest.mocked(useNavigate).mockReturnValue(mockNavigate);

    // Add a portal container for dialogs
    const dialogRoot = document.createElement('div');
    dialogRoot.setAttribute('id', 'dialog-root');
    document.body.appendChild(dialogRoot);
  });

  afterEach(() => {
    // Clean up the portal container
    const dialogRoot = document.getElementById('dialog-root');
    if (dialogRoot) {
      document.body.removeChild(dialogRoot);
    }
  });

  test('renders the movie list correctly', async () => {
    useFetchMovies.mockReturnValue({
      movieList: moviesListMock.data,
      loading: false,
      error: null,
    });

    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <MovieListPage />
      </Router>
    );

    const movieTiles = screen.getAllByTestId('movie-tile');
    expect(movieTiles.length).toBe(moviesListMock.data.length);
    expect(screen.getByText('Fifty Shades Freed')).toBeInTheDocument();
  });

  test('displays loading message while fetching movies', () => {
    useFetchMovies.mockReturnValue({
      movieList: [],
      loading: true,
      error: null,
    });

    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <MovieListPage />
      </Router>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays error message when fetching movies fails', () => {
    useFetchMovies.mockReturnValue({
      movieList: [],
      loading: false,
      error: 'Failed to fetch movies',
    });

    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <MovieListPage />
      </Router>
    );

    expect(
      screen.getByText('Error: Failed to fetch movies')
    ).toBeInTheDocument();
  });

  test('navigates to the "Add Movie" page when "+Add movie" button is clicked', () => {
    useFetchMovies.mockReturnValue({
      movieList: [],
      loading: false,
      error: null,
    });

    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <MovieListPage />
      </Router>
    );

    const addMovieButton = screen.getByText('+Add movie');
    userEvent.click(addMovieButton);

    // Verify that navigate is called with the correct path
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/new');
  });

  test('navigates to movie details when a movie tile is clicked', () => {
    useFetchMovies.mockReturnValue({
      movieList: moviesListMock.data,
      loading: false,
      error: null,
    });

    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <MovieListPage />
      </Router>
    );

    const movieTile = screen.getAllByTestId('movie-tile')[0];
    userEvent.click(movieTile);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(`/${moviesListMock.data[0].id}?`);
  });

  test('updates the URL when a new genre is selected', () => {
    useFetchMovies.mockReturnValue({
      movieList: moviesListMock.data,
      loading: false,
      error: null,
    });

    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <MovieListPage />
      </Router>
    );

    const genreSelect = screen.getByText('All');
    userEvent.click(genreSelect);

    const actionGenre = screen.getByText('Comedy');
    userEvent.click(actionGenre);

    expect(history.location.search).toContain('genre=Comedy');
  });

  test('updates the URL when a new sort option is selected', () => {
    useFetchMovies.mockReturnValue({
      movieList: moviesListMock.data,
      loading: false,
      error: null,
    });

    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <MovieListPage />
      </Router>
    );

    const sortSelect = screen.getByRole('combobox');
    userEvent.selectOptions(sortSelect, 'release_date');

    expect(history.location.search).toContain('sortBy=release_date');
  });
});
