import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SearchForm from './SearchForm';

describe('SearchForm Component', () => {
  test('renders input with the initial value passed in props', () => {
    render(<SearchForm initialQuery="Avatar" onSearch={jest.fn()} />);

    const input = screen.getByRole('textbox');

    expect(input).toHaveValue('Avatar');
  });

  test('calls "onSearch" prop with proper value after typing and clicking Submit button', () => {
    const mockOnSearch = jest.fn();

    render(<SearchForm initialQuery="" onSearch={mockOnSearch} />);

    const input = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /search/i });

    userEvent.type(input, 'Avatar');
    userEvent.click(submitButton);

    expect(mockOnSearch).toHaveBeenCalledWith('Avatar');
  });

  test('calls "onSearch" prop with proper value after typing and pressing Enter key', () => {
    const mockOnSearch = jest.fn();

    render(<SearchForm initialQuery="" onSearch={mockOnSearch} />);

    const input = screen.getByRole('textbox');

    userEvent.type(input, 'Avatar{enter}');

    expect(mockOnSearch).toHaveBeenCalledWith('Avatar');
  });
});