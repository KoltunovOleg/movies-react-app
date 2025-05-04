import errorMessages from '../../data/errorMessages'; // Import errorMessages

export const validateMovieForm = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = errorMessages.title.required;
  }

  if (!values.release_date) {
    errors.release_date = errorMessages.release_date.required;
  }

  if (!values.poster_path) {
    errors.poster_path = errorMessages.poster_path.required;
  } else if (!/^https?:\/\/.+\..+/.test(values.poster_path)) {
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
