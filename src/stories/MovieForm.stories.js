import React from 'react';
import MovieForm from '../components/MovieForm/MovieForm';

export default {
  title: 'Components/MovieForm',
  component: MovieForm,
};

export const EmptyFields = (args) => <MovieForm {...args} />;
EmptyFields.args = {
  initialMovieInfo: {},
  onSubmit: (formData) => console.log('Form submitted with: ', formData),
};

export const PrefilledFields = (args) => <MovieForm {...args} />;
PrefilledFields.args = {
  initialMovieInfo: {
    title: 'Inception',
    release_date: '2010-07-16',
    poster_path: 'https://example.com/inception.jpg',
    vote_average: 8.8,
    genres: ['Comedy', 'Sci-Fi'],
    runtime: 148,
    overview:
      'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
  },
  onSubmit: (formData) => console.log('Form submitted with: ', formData),
};
