import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Dialog from '../../shared/Dialog/Dialog';
import MovieForm from '../MovieForm/MovieForm';
import { API_URL } from '../../constants';

function EditMovieForm() {
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

  return (
    <Dialog title="Edit Movie" onClose={() => window.history.back()}>
      <MovieForm initialMovieInfo={movie} movieId={movieId} method={'PUT'} />
    </Dialog>
  );
}

export default EditMovieForm;
