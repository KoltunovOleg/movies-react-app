import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import GenreSelect from './GenreSelect';

describe('GenreSelect Component', () => {
  test('renders all genres passed in props', () => {
    const genres = ['All', 'Documentary', 'Comedy', 'Horror', 'Crime'];

    render(<GenreSelect genres={genres} selectedGenre="All" onSelect={jest.fn()} />);

    genres.forEach((genre) => {
      expect(screen.getByText(genre)).toBeInTheDocument();
    });
  });

  test('highlights the selected genre passed in props', () => {
    const genres = ['All', 'Documentary', 'Comedy', 'Horror', 'Crime'];
    const selectedGenre = 'Comedy';

    render(<GenreSelect genres={genres} selectedGenre={selectedGenre} onSelect={jest.fn()} />);

    const selectedElement = screen.getByText(selectedGenre);
    expect(selectedElement).toHaveClass('selected');
  });

  test('calls "onSelect" callback with correct genre after a click event', () => {
    const genres = ['All', 'Documentary', 'Comedy', 'Horror', 'Crime'];
    const mockOnSelect = jest.fn();

    render(<GenreSelect genres={genres} selectedGenre="All" onSelect={mockOnSelect} />);

    const genreToClick = screen.getByText('Horror');
    userEvent.click(genreToClick);

    expect(mockOnSelect).toHaveBeenCalledWith('Horror');
  });
});