import React, { useState } from 'react';
import Counter from './components/counter/counter';
import SearchForm from './components/searchform/searchform';
import GenreSelect from './components/genreselect/genreselect';

function App() {
  const genres = ['All', 'Documentary', 'Comedy', 'Horror', 'Crime'];
  const [selectedGenre, setSelectedGenre] = useState('All');

  const handleSearch = (query) => {
    console.log('Search query:', query);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    console.log('Selected genre:', genre);
  };


  return React.createElement(
    'div',
    null,
    React.createElement(Counter, {
      initialValue: 0,
    }),
    React.createElement(SearchForm, {
      initialQuery: '',
      onSearch: handleSearch,
    }),
    React.createElement(GenreSelect, {
      genres: genres,
      selectedGenre: selectedGenre,
      onSelect: handleGenreSelect,
    })
  );
}

export default App;
