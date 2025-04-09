import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SortControl from './SortControl';

describe('SortControl Component', () => {
  const mockOnSortChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with the current selection', () => {
    render(<SortControl currentSelection="releaseDate" onSortChange={mockOnSortChange} />);

    expect(screen.getByLabelText('Sort by')).toBeInTheDocument();

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue('releaseDate');

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(2);
    expect(options[0]).toHaveValue('releaseDate');
    expect(options[0]).toHaveTextContent('Release Date');
    expect(options[1]).toHaveValue('title');
    expect(options[1]).toHaveTextContent('Title');
  });

  it('calls onSortChange when a new option is selected', () => {
    render(<SortControl currentSelection="releaseDate" onSortChange={mockOnSortChange} />);

    const selectElement = screen.getByRole('combobox');

    fireEvent.change(selectElement, { target: { value: 'title' } });

    expect(mockOnSortChange).toHaveBeenCalledTimes(1);
    expect(mockOnSortChange).toHaveBeenCalledWith('title');
  });
});