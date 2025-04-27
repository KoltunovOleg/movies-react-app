import { useNavigate } from 'react-router';
import Dialog from '../../shared/Dialog/Dialog';
import MovieForm from '../MovieForm/MovieForm';
import { API_URL } from '../../constants';
import { handleMovieFormSubmit } from '../../utils/movieFormUtils';

function AddMovieForm() {
  const navigate = useNavigate();

  const handleFormSubmit = (formData) => {
    handleMovieFormSubmit({
      formData,
      method: 'POST',
      apiUrl: `${API_URL}`,
      navigate,
    });
  };

  return (
    <Dialog title="Add Movie" onClose={() => window.history.back()}>
      <MovieForm onSubmit={handleFormSubmit} />
    </Dialog>
  );
}

export default AddMovieForm;
