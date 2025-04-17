import React from 'react';
import { render, screen } from '@testing-library/react';
import FilterBar from './FilterBar';

describe('FilterBar Component', () => {
  test('renders the FilterBar component with the correct content', () => {
    render(<FilterBar>Test Content</FilterBar>);
    const filterBarElement = screen.getByText('Test Content');
    expect(filterBarElement).toBeInTheDocument();
  });

  test('renders children inside the FilterBar component', () => {
    render(
      <FilterBar>
        <div>Child Content</div>
      </FilterBar>
    );
    const childElement = screen.getByText('Child Content');
    expect(childElement).toBeInTheDocument();
  });
});