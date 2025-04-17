import React, { useState } from 'react';
// import Counter from './components/Counter/Counter';
import MovieTileList from './layouts/MovieTileList/MovieTileList';
import FilterBar from './layouts/FilterBar/FilterBar';
import Header from './layouts/Header/Header';
import MovieTile from './components/MovieTile/MovieTile';
import MovieForm from './components/MovieForm/MovieForm';
import SearchForm from './components/SearchForm/SearchForm';
import SortControl from './components/SortControl/SortControl';
import GenreSelect from './components/GenreSelect/GenreSelect';
import MovieDetails from './components/MovieDetails/MovieDetails';
import Dialog from './shared/Dialog/Dialog';
import Button from './shared/Button/Button';
import { genres } from './data/genres';
import moviesList from './data/movies.json';
import Logo from "./assets/logo.png"
import BG from "./assets/bg-header.jpg"

function App() {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [initialMovieInfo, setInitialMovieInfo] = useState({});
  const [sortBy, setSortBy] = useState('releaseDate');

  const handleAddMovie = (e) => {
    e.stopPropagation();
    setInitialMovieInfo({});
    setShowDialog(true);
  };

  const handleFormSubmit = (formData) => {
    if (formData) {
      console.log('Form submitted:', formData);
    } else {
      console.log('Form cancelled');
    }
    setShowDialog(false);
  };

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
      {/* <Counter initialValue={0} /> */}
      <Header
        backgroundImage={BG}
        pageTitle="My Movie App"
        logo={Logo}
      >
        <SearchForm initialQuery="" onSearch={handleSearch} />
        <Button text="+Add movie" onClick={handleAddMovie} />
      </Header>
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
      {showDialog && (
        <Dialog title='Add Movie' onClose={() => setShowDialog(false)}>
          <MovieForm initialMovieInfo={initialMovieInfo} onSubmit={handleFormSubmit} />
        </Dialog>
      )}
    </div>
  );
}

export default App;