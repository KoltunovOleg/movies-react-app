import Button from '../../shared/Button/Button';
import { genres as defaultGenres } from '../../data/genres';
import './movie-form.scss';

function MovieForm({ initialMovieInfo = {}, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const genreSelect = e.target.elements.genre;
    const selectedGenres = Array.from(genreSelect.selectedOptions).map(
      (option) => option.value
    );
    formData.genre = selectedGenres;
    onSubmit?.(formData);
  };

  // Handle genres logic
  const movieGenres = initialMovieInfo?.genres || [];
  const allGenres = Array.from(new Set([...defaultGenres, ...movieGenres])); // Merge and deduplicate genres
  const filteredGenres = allGenres.filter((genre) => genre !== 'All');

  return (
    <form className="movie-form" role="form" onSubmit={handleSubmit}>
      <div className="movie-form__row">
        <div className="movie-form__group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={initialMovieInfo?.title || ''}
            placeholder="Enter movie title"
            required
          />
        </div>

        <div className="movie-form__group">
          <label htmlFor="release_date">Release Date</label>
          <input
            type="date"
            id="release_date"
            name="release_date"
            defaultValue={initialMovieInfo?.release_date || ''}
            required
          />
        </div>
      </div>

      <div className="movie-form__row">
        <div className="movie-form__group">
          <label htmlFor="poster_path">Movie URL</label>
          <input
            type="url"
            id="poster_path"
            name="poster_path"
            defaultValue={initialMovieInfo?.poster_path || ''}
            placeholder="Enter movie poster URL"
            required
          />
        </div>

        <div className="movie-form__group">
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            id="rating"
            name="rating"
            defaultValue={initialMovieInfo?.vote_average?.toString() || ''}
            placeholder="Enter movie rating"
            min="0"
            max="10"
            step="0.1"
            required
          />
        </div>
      </div>

      <div className="movie-form__row">
        <div className="movie-form__group">
          <label htmlFor="genre">Genre</label>
          <select
            id="genre"
            name="genre"
            defaultValue={movieGenres}
            multiple
            required
          >
            {filteredGenres.map((genre) => (
              <option
                key={genre}
                value={genre}
                selected={movieGenres.includes(genre)}
              >
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div className="movie-form__group">
          <label htmlFor="runtime">Runtime</label>
          <input
            type="number"
            id="runtime"
            name="runtime"
            defaultValue={initialMovieInfo?.runtime?.toString() || ''}
            placeholder="Enter runtime in minutes"
            required
          />
        </div>
      </div>

      <div className="movie-form__row">
        <div className="movie-form__group movie-form__group--full">
          <label htmlFor="overview">Overview</label>
          <textarea
            id="overview"
            name="overview"
            defaultValue={initialMovieInfo?.overview || ''}
            placeholder="Enter movie overview"
            required
          ></textarea>
        </div>
      </div>

      <div className="movie-form__actions">
        <Button
          text="Reset"
          className="secondary"
          onClick={() => onSubmit?.(null)}
        />
        <Button text="Submit" className="primary" type="submit" />
      </div>
    </form>
  );
}

export default MovieForm;
