import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useNavigate } from 'react-router';
import MovieTile from './MovieTile';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: jest.fn(),
}));

describe('MovieTile Component', () => {
  const mockMovie = {
    id: '1', // Added `id` for navigation
    poster_path: 'https://example.com/poster.jpg',
    title: 'Example Movie',
    release_date: '2023-01-01',
    genres: ['Action', 'Adventure'],
  };

  const mockOnClick = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(useNavigate).mockReturnValue(mockNavigate);

    // Add a portal container to the DOM for the Dialog component
    const portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'dialog-root'); // Match the target container used in Dialog
    document.body.appendChild(portalRoot);
  });

  afterEach(() => {
    // Clean up the portal container after each test
    const portalRoot = document.getElementById('dialog-root');
    if (portalRoot) {
      document.body.removeChild(portalRoot);
    }
  });

  it('renders movie details correctly', () => {
    render(
      <MemoryRouter>
        <MovieTile movie={mockMovie} onClick={mockOnClick} />
      </MemoryRouter>
    );

    const image = screen.getByAltText('Example Movie poster');

    expect(screen.getByText('Example Movie')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('Action, Adventure')).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/poster.jpg');
  });

  it('calls onClick handler when the movie tile is clicked', async () => {
    render(
      <MemoryRouter>
        <MovieTile movie={mockMovie} onClick={mockOnClick} />
      </MemoryRouter>
    );

    const movieTile = screen.getByTestId('movie-tile');
    await userEvent.click(movieTile);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(mockMovie);
  });

  it('opens the selector when ButtonDots is clicked', async () => {
    render(
      <MemoryRouter>
        <MovieTile movie={mockMovie} onClick={mockOnClick} />
      </MemoryRouter>
    );

    const buttonDots = screen.getByRole('button'); // Assuming ButtonDots is a button
    await userEvent.click(buttonDots);

    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('navigates to edit page when "Edit" is selected', async () => {
    render(
      <MemoryRouter>
        <MovieTile movie={mockMovie} onClick={mockOnClick} />
      </MemoryRouter>
    );

    const buttonDots = screen.getByRole('button'); // Assuming ButtonDots is a button
    await userEvent.click(buttonDots);

    const editOption = screen.getByText('Edit');
    await userEvent.click(editOption);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/1/edit'); // Navigates to /:movieId/edit
  });

  it('opens the dialog when "Delete" is selected', async () => {
    render(
      <MemoryRouter>
        <MovieTile movie={mockMovie} onClick={mockOnClick} />
      </MemoryRouter>
    );

    const buttonDots = screen.getByRole('button'); // Assuming ButtonDots is a button
    await userEvent.click(buttonDots);

    const deleteOption = screen.getByText('Delete');
    await userEvent.click(deleteOption);

    expect(screen.getByText('Delete movie')).toBeInTheDocument(); // Dialog title
    expect(screen.getByText('Confirm')).toBeInTheDocument(); // Confirm button in dialog
  });
});
