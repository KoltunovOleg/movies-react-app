import { Outlet, useParams } from 'react-router';
import { useNavigate, useSearchParams } from 'react-router';
import { useState, useEffect } from 'react';
import Header from '../../layouts/Header/Header';
import FilterBar from '../../layouts/FilterBar/FilterBar';
import GenreSelect from '../../components/GenreSelect/GenreSelect';
import SortControl from '../../components/SortControl/SortControl';
import MovieTileList from '../../layouts/MovieTileList/MovieTileList';
import MovieTile from '../../components/MovieTile/MovieTile';
import Dialog from '../../shared/Dialog/Dialog';
import MovieForm from '../../components/MovieForm/MovieForm';
import Button from '../../shared/Button/Button';
import { genres } from '../../data/genres';
import { initialMovieList } from '../../data/movies';
import { API_URL } from '../../constants';
import BG from '../../assets/bg-header.jpg';

function MovieListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movieList, setMovieList] = useState(initialMovieList);
  const [showDialog, setShowDialog] = useState(false);
  const [initialMovieInfo, setInitialMovieInfo] = useState({});
  const { movieId } = useParams();
  const navigate = useNavigate();

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

  const handleGenreSelect = (genre) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set('genre', genre);
      return newParams;
    });
  };

  const handleMovieClick = (movie) => {
    const params = new URLSearchParams(window.location.search);
    navigate(`/${movie.id}?${params.toString()}`);
  };

  const closeMovieDetails = () => {
    const params = new URLSearchParams(window.location.search);
    navigate(`/?${params.toString()}`);
  };

  const handleSortChange = (value) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set('sortBy', value);
      return newParams;
    });
  };

  const getHeaderActionButton = () => {
    if (!movieId) {
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
        <Outlet />
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
          <MovieTile key={movie.id} movie={movie} onClick={handleMovieClick} data-testid="movie-tile"/>
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