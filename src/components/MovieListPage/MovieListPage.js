import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
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
import BG from '../../assets/bg-header.jpg';
import { API_URL } from '../../constants';
import { initialMovieList } from '../../data/movies';

function MovieListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [initialMovieInfo, setInitialMovieInfo] = useState({});
  // const [sortBy, setSortBy] = useState('releaseDate');
  // const [searchQuery, setSearchQuery] = useState('');
  // const [activeGenre, setActiveGenre] = useState('All');
  const [movieList, setMovieList] = useState(initialMovieList);

  const searchQuery = searchParams.get('query') || '';
  const sortBy = searchParams.get('sortBy') || 'releaseDate';
  const activeGenre = searchParams.get('genre') || 'All';

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
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set('query', query);
      return newParams;
    });

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
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set('genre', genre);
      return newParams;
    });
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeMovieDetails = () => {
    setSelectedMovie(null);
  };

  const handleSortChange = (value) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set('sortBy', value);
      return newParams;
    });
  };

  const getHeaderActionButton = () => {
    console.log('selectedMovie: ', selectedMovie);
    if (!selectedMovie) {
      return (
        <Button
          text="+Add movie"
          onClick={handleAddMovie}
          className="default btn--add"
        />
      );
    } else {
      return (
        <button className="movie-details__close" onClick={closeMovieDetails}>
          &#x1F50E;&#xFE0E;
        </button>
      );
    }
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
      <Header backgroundImage={BG} renderActionButton={getHeaderActionButton}>
        {selectedMovie ? (
          <MovieDetails movie={selectedMovie} />
        ) : (
          <div className="header__content">
            <h1 className="header__title">My Movie App</h1>
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
