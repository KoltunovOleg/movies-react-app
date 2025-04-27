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
    render(
      <SortControl
        currentSelection="release_date" // Updated to match the actual value in the component
        onSortChange={mockOnSortChange}
      />
    );

    // Verify the label is rendered
    expect(screen.getByLabelText('Sort by')).toBeInTheDocument();

    // Verify the select element is rendered with the correct value
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue('release_date'); // Updated to match the actual value

    // Verify the options are rendered correctly
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(2);
    expect(options[0]).toHaveValue('release_date');
    expect(options[0]).toHaveTextContent('Release Date');
    expect(options[1]).toHaveValue('title');
    expect(options[1]).toHaveTextContent('Title');
  });

  it('calls onSortChange when a new option is selected', () => {
    render(
      <SortControl
        currentSelection="release_date"
        onSortChange={mockOnSortChange}
      />
    );

    const selectElement = screen.getByRole('combobox');

    // Simulate changing the selection
    fireEvent.change(selectElement, { target: { value: 'title' } });

    // Verify the callback is called with the correct value
    expect(mockOnSortChange).toHaveBeenCalledTimes(1);
    expect(mockOnSortChange).toHaveBeenCalledWith('title');
  });

  it('updates the value of the dropdown when currentSelection changes', () => {
    const { rerender } = render(
      <SortControl
        currentSelection="release_date"
        onSortChange={mockOnSortChange}
      />
    );

    const selectElement = screen.getByRole('combobox');

    // Verify the initial value
    expect(selectElement).toHaveValue('release_date');

    // Rerender with a new currentSelection
    rerender(
      <SortControl currentSelection="title" onSortChange={mockOnSortChange} />
    );

    // Verify the updated value
    expect(selectElement).toHaveValue('title');
  });
});
