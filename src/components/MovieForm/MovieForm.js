import React from 'react';
import Button from '../../shared/Button/Button';
import { genres } from '../../data/genres';
import './movie-form.scss';

// Import genres array
// export const genres = ['All', 'Documentary', 'Comedy', 'Horror', 'Crime'];

function MovieForm({ initialMovieInfo = {}, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    onSubmit?.(formData);
  };

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
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
          <label htmlFor="movie_url">Movie URL</label>
          <input
            type="url"
            id="movie_url"
            name="movie_url"
            defaultValue={initialMovieInfo?.movie_url || ''}
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
            defaultValue={initialMovieInfo?.rating || ''}
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
            defaultValue={initialMovieInfo?.genre || ''}
            required
          >
            <option value="" disabled>
              Select genre
            </option>
            {genres
              .filter((genre) => genre !== 'All')
              .map((genre) => (
                <option key={genre} value={genre}>
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
            defaultValue={initialMovieInfo?.runtime || ''}
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
        <Button
          text="Submit"
          className="primary"
          onClick={() => {}}
        />
      </div>
    </form>
  );
}

export default MovieForm;