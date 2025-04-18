import './movie-details.scss';

function MovieDetails({ movie, onClose }) {
  const { poster_path, title, release_date, genres, overview, runtime, vote_average } = movie;

  return (
    <div className="movie-details">
      <div className="movie-details__content">
        <button className="movie-details__close" onClick={onClose}>
        &#x1F50E;&#xFE0E;
        </button>
        <img
          className="movie-details__poster"
          src={poster_path}
          alt={`${title} poster`}
        />
        <div className="movie-details__info">
          <h2 className="movie-details__title">{title}</h2>
          <p className="movie-details__genres">{genres.join(', ')}</p>
          <p className="movie-details__release-date">Release Date: {release_date}</p>
          <p className="movie-details__runtime">Runtime: {runtime} minutes</p>
          <p className="movie-details__rating">Rating: {vote_average}</p>
          <p className="movie-details__overview">{overview}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;