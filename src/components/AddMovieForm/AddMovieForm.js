import Dialog from '../../shared/Dialog/Dialog';
import MovieForm from '../MovieForm/MovieForm';

function AddMovieForm() {
  return (
    <Dialog title="Add Movie" onClose={() => window.history.back()}>
      <MovieForm />
    </Dialog>
  );
}

export default AddMovieForm;
