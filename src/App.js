import React, { useState } from 'react';
import Counter from './components/Counter/Counter';
import SearchForm from './components/SearchForm/SearchForm';
import GenreSelect from './components/GenreSelect/GenreSelect';
import MovieTileList from './layouts/MovieTileList/MovieTileList';
import MovieDetails from './components/MovieDetails/MovieDetails';
import MovieTile from './components/MovieTile/MovieTile';
import SortControl from './components/SortControl/SortControl'
import FilterBar from './layouts/FilterBar/FilterBar'
import { genres } from './data/genres';
import moviesList from './data/movies.json';

function App() {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [sortBy, setSortBy] = useState('releaseDate');

  const handleSearch = (query) => {
    console.log('Search query:', query);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    console.log('Selected genre:', genre);

  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeMovieDetails = () => {
    setSelectedMovie(null);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    console.log('Sort by:', value);
  };

  return (
    <div>
      <Counter initialValue={0} />
      <SearchForm initialQuery="" onSearch={handleSearch} />

      <FilterBar>
        <GenreSelect
          genres={genres}
          selectedGenre={selectedGenre}
          onSelect={handleGenreSelect}
        />
        <SortControl currentSelection={sortBy} onSortChange={handleSortChange} />
      </FilterBar>

      <MovieTileList>
        {moviesList.data.map((movie) => (
          <MovieTile key={movie.id} movie={movie} onClick={handleMovieClick} />
        ))}
      </MovieTileList>

      {selectedMovie && (
        <MovieDetails movie={selectedMovie} onClose={closeMovieDetails} />
      )}
    </div>
  );
}

export default App;