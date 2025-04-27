const errorMessages = {
  title: {
    required: 'Title is required',
  },
  release_date: {
    required: 'Release date is required',
  },
  poster_path: {
    required: 'Movie URL is required',
    invalid: 'Invalid URL',
  },
  rating: {
    required: 'Rating is required',
    range: 'Rating must be between 0 and 10',
  },
  genre: {
    required: 'At least one genre must be selected',
  },
  runtime: {
    required: 'Runtime is required',
    positive: 'Runtime must be a positive number',
  },
  overview: {
    required: 'Overview is required',
  },
};

export default errorMessages;
