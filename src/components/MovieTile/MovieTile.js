import './movie-tile.scss';

function MovieTile({ movie, onClick }) {
  const { poster_path, title, release_date, genres } = movie;

  return (
    <div className="movie-tile" onClick={() => onClick?.(movie)}>
      <img
        className="movie-tile__image"
        src={poster_path}
        alt={`${title} poster`}
      />
      <div className="movie-tile__info">
        <h3 className="movie-tile__title">{title}</h3>
        <span className="movie-tile__year">{new Date(release_date).getFullYear()}</span>
        <p className="movie-tile__genres">{genres.join(', ')}</p>
      </div>
    </div>
  );
}

export default MovieTile;