import { useState, useEffect } from 'react';
import MovieTileList from '../../layouts/MovieTileList/MovieTileList';
import FilterBar from '../../layouts/FilterBar/FilterBar';
import Header from '../../layouts/Header/Header';
import MovieTile from '../../components/MovieTile/MovieTile';
import MovieForm from '../../components/MovieForm/MovieForm';
import SearchForm from '../../components/SearchForm/SearchForm';
import SortControl from '../../components/SortControl/SortControl';
import GenreSelect from '../../components/GenreSelect/GenreSelect';
import MovieDetails from '../../components/MovieDetails/MovieDetails';
import Dialog from '../../shared/Dialog/Dialog';
import Button from '../../shared/Button/Button';
import { genres } from '../../data/genres';
import moviesListMock from '../../data/movies.json';
import Logo from '../../assets/logo.png';
import BG from '../../assets/bg-header.jpg';

function MovieListPage() {
  const API_URL = 'http://localhost:4000/movies';
  const initialMovieList = JSON.parse(JSON.stringify(moviesListMock.data));
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [initialMovieInfo, setInitialMovieInfo] = useState(null);
  const [sortBy, setSortBy] = useState('releaseDate');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGenre, setActiveGenre] = useState('All');
  const [movieList, setMovieList] = useState(initialMovieList);

  const handleAddMovie = (e) => {
    e.stopPropagation();
    setInitialMovieInfo(null);
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
    setSearchQuery(query);

    const matchedMovie = movieList.find((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    if (matchedMovie) {
      setSelectedMovie(matchedMovie);
    } else {
      setSelectedMovie(null);
    }
  };

  const handleGenreSelect = (genre) => {
    setActiveGenre(genre);
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

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchMovies = async () => {
      try {
        const params = new URLSearchParams({
          search: searchQuery,
          sortBy: sortBy,
          filter: activeGenre !== 'All' ? activeGenre : '',
        });

        const response = await fetch(`${API_URL}?${params.toString()}`, {
          signal,
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        setMovieList(data.data || []);
      } catch (error) {
        console.log('Fetch aborted: ', error);
      }
    };

    fetchMovies();
    return () => controller.abort();
  }, [searchQuery, sortBy, activeGenre]);

  return (
    <>
      <Header backgroundImage={BG} logo={Logo}>
        {selectedMovie ? (
          <MovieDetails movie={selectedMovie} onClose={closeMovieDetails} />
        ) : (
          <div className="header__content">
            <h1 className="header__title">My Movie App</h1>
            <Button
              text="+Add movie"
              onClick={handleAddMovie}
              className="default btn--add"
            />
            <SearchForm initialQuery={searchQuery} onSearch={handleSearch} />
          </div>
        )}
      </Header>
      <FilterBar>
        <GenreSelect
          genres={genres}
          activeGenre={activeGenre}
          onSelect={handleGenreSelect}
        />
        <SortControl
          currentSelection={sortBy}
          onSortChange={handleSortChange}
        />
      </FilterBar>
      <MovieTileList>
        {movieList.map((movie) => (
          <MovieTile key={movie.id} movie={movie} onClick={handleMovieClick} />
        ))}
      </MovieTileList>
      {showDialog && (
        <Dialog title="Add Movie" onClose={() => setShowDialog(false)}>
          <MovieForm
            initialMovieInfo={initialMovieInfo}
            onSubmit={handleFormSubmit}
          />
        </Dialog>
      )}
    </>
  );
}

export default MovieListPage;
