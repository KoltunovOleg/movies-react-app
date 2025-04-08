import React from 'react';
import MovieTile from '../components/MovieTile/MovieTile';

export default {
  title: 'Components/MovieTile',
  component: MovieTile,
  argTypes: {
    onClick: { action: 'onClick' },
    onEdit: { action: 'onEdit' },
    onDelete: { action: 'onDelete' },
  },
};

const Template = (args) => <MovieTile {...args} />;

export const Default = Template.bind({});
Default.args = {
  movie: {
    poster_path: 'https://image.tmdb.org/t/p/w500/3kcEGnYBHDeqmdYf8ZRbKdfmlUy.jpg',
    title: 'Fifty Shades Freed',
    release_date: '2018-02-07',
    genres: ['Drama', 'Romance'],
  },
};