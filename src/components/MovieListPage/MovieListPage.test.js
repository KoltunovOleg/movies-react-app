import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieListPage from './MovieListPage';
import moviesListMock from '../../data/movies.json';

global.fetch = jest.fn();

describe('MovieListPage Component', () => {
  beforeEach(() => {
    fetch.mockClear();
    const dialogRoot = document.createElement('div');
    dialogRoot.setAttribute('id', 'dialog-root');
    document.body.appendChild(dialogRoot);
  });

  afterEach(() => {
    const dialogRoot = document.getElementById('dialog-root');
    if (dialogRoot) {
      document.body.removeChild(dialogRoot);
    }
  });
  
  test('stops event propagation when "+Add movie" button is clicked', async () => {
    render(<MovieListPage />);

    const addMovieButton = screen.getByText('+Add movie');

    const event = new MouseEvent("click", { bubbles: true });
    jest.spyOn(event, "stopPropagation");

    addMovieButton.dispatchEvent(event);

    expect(event.stopPropagation).toHaveBeenCalled();
  });

  test('renders the movie list correctly', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: moviesListMock.data,
      }),
    });

    render(<MovieListPage />);

    expect(screen.getByText(/My Movie App/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Fifty Shades Freed')).toBeInTheDocument();
    });

    const movieTiles = screen.getAllByTestId('movie-tile');
    expect(movieTiles.length).toBe(moviesListMock.data.length);
  });
});