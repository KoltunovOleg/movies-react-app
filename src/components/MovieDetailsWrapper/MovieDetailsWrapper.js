import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import MovieDetails from '../MovieDetails/MovieDetails';
import { API_URL } from '../../constants';

function MovieDetailsWrapper() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/${movieId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return <MovieDetails movie={movie} />;
}

export default MovieDetailsWrapper;