import React from 'react';
import { render } from '@testing-library/react';
import FilterBar from './FilterBar';

describe('FilterBar Component', () => {
  test('renders the FilterBar component with the correct CSS class', () => {
    const { container } = render(<FilterBar>Test Content</FilterBar>);
    const filterBarElement = container.querySelector('.filter-bar');
    expect(filterBarElement).toBeInTheDocument();
  });

  test('renders children inside the FilterBar component', () => {
    const { container } = render(
      <FilterBar>
        <div className="child-element">Child Content</div>
      </FilterBar>
    );
    const filterBarElement = container.querySelector('.filter-bar');
    const childElement = container.querySelector('.child-element');
    expect(filterBarElement).toBeInTheDocument();
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Child Content');
  });
});