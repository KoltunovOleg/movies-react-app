import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from '../../shared/Button/Button';
import { genres as defaultGenres } from '../../data/genres';
import errorMessages from '../../data/errorMessages';
import './movie-form.scss';

function MovieForm({ initialMovieInfo = {}, onSubmit }) {
  // Merge and deduplicate genres
  const movieGenres = initialMovieInfo?.genres || [];
  const allGenres = Array.from(new Set([...defaultGenres, ...movieGenres]));
  const filteredGenres = allGenres.filter((genre) => genre !== 'All');

  const initialValues = {
    title: initialMovieInfo?.title || '',
    release_date: initialMovieInfo?.release_date || '',
    poster_path: initialMovieInfo?.poster_path || '',
    vote_average: initialMovieInfo?.vote_average?.toString() || '',
    genres: movieGenres,
    runtime: initialMovieInfo?.runtime?.toString() || '',
    overview: initialMovieInfo?.overview || '',
  };

  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = errorMessages.title.required;
    }

    if (!values.release_date) {
      errors.release_date = errorMessages.release_date.required;
    }

    if (!values.poster_path) {
      errors.poster_path = errorMessages.poster_path.required;
    } else if (!/^https?:\/\/.+\..+$/.test(values.poster_path)) {
      errors.poster_path = errorMessages.poster_path.invalid;
    }

    if (!values.vote_average) {
      errors.vote_average = errorMessages.rating.required;
    } else if (values.vote_average < 0 || values.vote_average > 10) {
      errors.vote_average = errorMessages.rating.range;
    }

    if (!values.genres || values.genres.length === 0) {
      errors.genres = errorMessages.genre.required;
    }

    if (!values.runtime) {
      errors.runtime = errorMessages.runtime.required;
    } else if (values.runtime <= 0) {
      errors.runtime = errorMessages.runtime.positive;
    }

    if (!values.overview) {
      errors.overview = errorMessages.overview.required;
    }

    return errors;
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Form submitted:', values);
    onSubmit?.(values);
    setSubmitting(false);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className="movie-form" role="form">
          <div className="movie-form__row">
            <div className="movie-form__group">
              <label htmlFor="title">Title</label>
              <Field
                type="text"
                id="title"
                name="title"
                placeholder="Enter movie title"
              />
              <ErrorMessage name="title" component="div" className="error" />
            </div>

            <div className="movie-form__group">
              <label htmlFor="release_date">Release Date</label>
              <Field type="date" id="release_date" name="release_date" />
              <ErrorMessage
                name="release_date"
                component="div"
                className="error"
              />
            </div>
          </div>

          <div className="movie-form__row">
            <div className="movie-form__group">
              <label htmlFor="poster_path">Movie URL</label>
              <Field
                type="url"
                id="poster_path"
                name="poster_path"
                placeholder="Enter movie poster URL"
              />
              <ErrorMessage
                name="poster_path"
                component="div"
                className="error"
              />
            </div>

            <div className="movie-form__group">
              <label htmlFor="vote_average">Rating</label>
              <Field
                type="number"
                id="vote_average"
                name="vote_average"
                placeholder="Enter movie rating"
                min="0"
                max="10"
                step="0.1"
              />
              <ErrorMessage name="rating" component="div" className="error" />
            </div>
          </div>

          <div className="movie-form__row">
            <div className="movie-form__group">
              <label htmlFor="genres">Genre</label>
              <Field
                as="select"
                id="genres"
                name="genres"
                multiple
                className="movie-form__select"
              >
                {filteredGenres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="genres" component="div" className="error" />
            </div>

            <div className="movie-form__group">
              <label htmlFor="runtime">Runtime</label>
              <Field
                type="number"
                id="runtime"
                name="runtime"
                placeholder="Enter runtime in minutes"
              />
              <ErrorMessage name="runtime" component="div" className="error" />
            </div>
          </div>

          <div className="movie-form__row">
            <div className="movie-form__group movie-form__group--full">
              <label htmlFor="overview">Overview</label>
              <Field
                as="textarea"
                id="overview"
                name="overview"
                placeholder="Enter movie overview"
              />
              <ErrorMessage name="overview" component="div" className="error" />
            </div>
          </div>

          <div className="movie-form__actions">
            <Button
              text="Reset"
              className="secondary"
              onClick={() => onSubmit?.(null)}
            />
            <Button
              text={isSubmitting ? 'Submitting...' : 'Submit'}
              className="primary"
              type="submit"
              disabled={isSubmitting}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default MovieForm;
