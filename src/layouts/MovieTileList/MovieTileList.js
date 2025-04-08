import React from 'react';
import './movie-tile-list.scss';

function MovieTileList({ children }) {
  return <div className="movie-tile-list">{children}</div>;
}

export default MovieTileList;