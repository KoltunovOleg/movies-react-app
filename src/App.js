import React, { useState } from 'react';
import Counter from './components/Counter/Counter';
import SearchForm from './components/SearchForm/SearchForm';
import GenreSelect from './components/GenreSelect/GenreSelect';
import { genres } from './data/genres';

function App() {
  const [selectedGenre, setSelectedGenre] = useState('All');

  const handleSearch = (query) => {
    console.log('Search query:', query);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    console.log('Selected genre:', genre);
  };

  return (
    <div>
      <Counter initialValue={0} />
      <SearchForm initialQuery="" onSearch={handleSearch} />
      <GenreSelect
        genres={genres}
        selectedGenre={selectedGenre}
        onSelect={handleGenreSelect}
      />
    </div>
  );
}

export default App;