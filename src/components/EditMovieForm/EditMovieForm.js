import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Dialog from '../../shared/Dialog/Dialog';
import MovieForm from '../MovieForm/MovieForm';
import { API_URL } from '../../constants';
import { handleMovieFormSubmit } from '../../utils/movieFormUtils';

function EditMovieForm() {
  const { movieId } = useParams();
  const navigate = useNavigate();
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

  const handleFormSubmit = (formData) => {
    handleMovieFormSubmit({
      formData,
      method: 'PUT',
      apiUrl: `${API_URL}`,
      navigate,
    });
  };

  return (
    <Dialog title="Edit Movie" onClose={() => window.history.back()}>
      <MovieForm initialMovieInfo={movie} onSubmit={handleFormSubmit} />
    </Dialog>
  );
}

export default EditMovieForm;