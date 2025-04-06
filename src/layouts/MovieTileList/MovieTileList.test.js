import React from 'react';
import { render } from '@testing-library/react';
import MovieTileList from './MovieTileList';

describe('MovieTileList Component', () => {
  test('renders the MovieTileList component with the correct CSS class', () => {
    const { container } = render(<MovieTileList />);

    const movieTileList = container.querySelector('.movie-tile-list');
    expect(movieTileList).toBeInTheDocument();
  });

  test('renders children inside the MovieTileList component', () => {
    const { container } = render(
      <MovieTileList>
        <div className="child">Movie 1</div>
        <div className="child">Movie 2</div>
      </MovieTileList>
    );

    const movieTileList = container.querySelector('.movie-tile-list');
    const children = container.querySelectorAll('.child');

    expect(movieTileList).toBeInTheDocument();
    expect(children.length).toBe(2);
  });
});