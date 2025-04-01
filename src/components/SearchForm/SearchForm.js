import React, { useState } from 'react';
import './search-form.scss';

function SearchForm({ initialQuery = '', onSearch }) {
  const [query, setQuery] = useState(initialQuery);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
      onSearch?.(query);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-form">
      <input
        type="text"
        className="search-form__input"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="What do you want to watch?"
      />
      <button
        className="search-form__button"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}

export default SearchForm;