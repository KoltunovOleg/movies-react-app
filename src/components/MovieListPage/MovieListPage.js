import { Outlet, useParams } from 'react-router';
import { useNavigate, useSearchParams } from 'react-router';
import Header from '../../layouts/Header/Header';
import FilterBar from '../../layouts/FilterBar/FilterBar';
import GenreSelect from '../../components/GenreSelect/GenreSelect';
import SortControl from '../../components/SortControl/SortControl';
import MovieTileList from '../../layouts/MovieTileList/MovieTileList';
import MovieTile from '../../components/MovieTile/MovieTile';
import Button from '../../shared/Button/Button';
import { genres } from '../../data/genres';
import BG from '../../assets/bg-header.jpg';
import useFetchMovies from '../../hooks/useFetchMovies';

function MovieListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { movieId } = useParams();
  const navigate = useNavigate();

  const searchQuery = searchParams.get('query') || '';
  const sortBy = searchParams.get('sortBy') || 'title';
  const activeGenre = searchParams.get('genre') || 'All';

  const { movieList, loading, error } = useFetchMovies(
    searchQuery,
    sortBy,
    activeGenre
  );

  const handleAddMovie = (e) => {
    e.stopPropagation();
    navigate('/new');
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
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <MovieTileList>
        {movieList.map((movie) => (
          <MovieTile
            key={movie.id}
            movie={movie}
            onClick={handleMovieClick}
            data-testid="movie-tile"
          />
        ))}
      </MovieTileList>
    </>
  );
}

export default MovieListPage;
