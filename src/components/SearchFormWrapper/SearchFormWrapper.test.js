import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import SearchFormWrapper from './SearchFormWrapper';

// Mock the SearchForm component
jest.mock('../SearchForm/SearchForm', () => ({ initialQuery, onSearch }) => (
  <div>
    <input
      data-testid="search-input"
      defaultValue={initialQuery}
      onChange={(e) => onSearch(e.target.value)}
    />
    <button data-testid="search-button" onClick={() => onSearch('test-query')}>
      Search
    </button>
  </div>
));

describe('SearchFormWrapper', () => {
  it('renders correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <SearchFormWrapper />
      </Router>
    );

    expect(screen.getByText('My Movie App')).toBeInTheDocument();
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  it('updates search query in the URL when searching', () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <SearchFormWrapper />
      </Router>
    );

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'new-query' } });

    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);

    expect(history.location.search).toBe('?query=test-query');
  });
});
