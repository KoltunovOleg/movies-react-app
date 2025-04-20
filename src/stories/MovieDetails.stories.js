import React from 'react';
import MovieDetails from '../components/MovieDetails/MovieDetails';
import '../components/MovieDetails/movie-details.scss';

export default {
  title: 'Components/MovieDetails',
  component: MovieDetails,
  argTypes: {
    onClose: { action: 'closed' },
  },
};

const Template = (args) => <MovieDetails {...args} />;

export const Default = Template.bind({});
Default.args = {
  movie: {
    poster_path:
      'https://image.tmdb.org/t/p/w500/pU1ULUq8D3iRxl1fdX2lZIzdHuI.jpg',
    title: 'Inception',
    release_date: '2010-07-16',
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    overview:
      'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    runtime: 148,
    vote_average: 8.8,
  },
};

export const NoGenres = Template.bind({});
NoGenres.args = {
  movie: {
    poster_path:
      'https://image.tmdb.org/t/p/w500/eKi8dIrr8voobbaGzDpe8w0PVbC.jpg',
    title: 'Unknown Movie',
    release_date: '2023-01-01',
    genres: [],
    overview: 'This movie does not have any genres specified.',
    runtime: 120,
    vote_average: 5.0,
  },
};

export const LongOverview = Template.bind({});
LongOverview.args = {
  movie: {
    poster_path:
      'https://image.tmdb.org/t/p/w500/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg',
    title: 'Epic Movie',
    release_date: '2022-12-25',
    genres: ['Drama', 'History'],
    overview:
      'This is an epic tale of courage and determination, spanning generations and continents. The story dives deep into the struggles and triumphs of humanity, exploring the depths of emotions and the heights of ambition. It is a masterpiece that will leave you breathless and pondering the meaning of life.',
    runtime: 180,
    vote_average: 9.5,
  },
};

export const MinimalDetails = Template.bind({});
MinimalDetails.args = {
  movie: {
    poster_path:
      'https://image.tmdb.org/t/p/w500/3kcEGnYBHDeqmdYf8ZRbKdfmlUy.jpg',
    title: 'Fifty Shades Freed',
    release_date: '2018-02-07',
    genres: ['Drama', 'Romance'],
    overview:
      'Believing they have left behind shadowy figures from their past, newlyweds Christian and Ana fully embrace an inextricable connection and shared life of luxury. But just as she steps into her role as Mrs. Grey and he relaxes into an unfamiliar stability, new threats could jeopardize their happy ending before it even begins.',
    runtime: 90,
    vote_average: 6.0,
  },
};
