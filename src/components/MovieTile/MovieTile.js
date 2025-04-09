import { useState } from 'react';
import ButtonDots from '../../shared/ButtonDots/ButtonDots';
import Selector from '../../shared/Selector/Selector';
import Dialog from '../../shared/Dialog/Dialog';
import Button from '../../shared/Button/Button';
import MovieForm from '../MovieForm/MovieForm';
import './movie-tile.scss';

function MovieTile({ movie, onClick }) {
  const { poster_path, title, release_date, genres } = movie;

  const [state, setState] = useState({
    showSelector: false,
    showDialog: false,
    dialogContent: '',
    dialogType: '',
  });

  const showSelector = () => {
    setState((prevState) => ({
      ...prevState,
      showSelector: true,
    }));
  };

  const closeSelector = () => {
    setState((prevState) => ({
      ...prevState,
      showSelector: false,
    }));
  };

  const openDialog = (type, content) => {
    setState((prevState) => ({
      ...prevState,
      showDialog: true,
      dialogContent: content,
      dialogType: type,
    }));
  };

  const closeDialog = () => {
    setState((prevState) => ({
      ...prevState,
      showDialog: false,
      dialogContent: '',
      dialogType: '',
    }));
  };

  const handleSelect = (item) => {
    closeSelector();

    if (item === 'Edit') {
      openDialog('Edit', 'Edit movie');
    } else if (item === 'Delete') {
      openDialog('Delete', 'Delete movie');
    }
  };

  const handleFormSubmit = (formData) => {
    console.log('Updated movie data:', formData);
    closeDialog();
  };


  return (
    <div 
      data-testid="movie-tile"
      className="movie-tile"
      onClick={() => onClick?.(movie)}
    >
      <ButtonDots onClick={showSelector} />
      <img
        className="movie-tile__image"
        src={poster_path}
        alt={`${title} poster`}
      />
      <div className="movie-tile__info">
        <h3 className="movie-tile__title">{title}</h3>
        <span className="movie-tile__year">{new Date(release_date).getFullYear()}</span>
        <p className="movie-tile__genres">{genres.join(', ')}</p>
      </div>

      {state.showSelector && (
        <Selector
          items={['Edit', 'Delete']}
          onClose={closeSelector}
          onSelect={handleSelect}
        />
      )}

      {state.showDialog && (
        <Dialog title={state.dialogContent} onClose={closeDialog}>
          {state.dialogType === 'Edit' ? (
            <MovieForm
              initialMovieInfo={{
                title: movie.title,
                release_date: movie.release_date,
                poster_path: movie.poster_path,
                vote_average: movie.vote_average || '',
                genres: movie.genres,
                runtime: movie.runtime || '',
                overview: movie.overview || '',
              }}
              onSubmit={handleFormSubmit}
            />
          ) : (
          <div className="dialog-actions">
            <Button
              text="Confirm"
              className="primary"
              onClick={() => console.log('Movie deleted')}
            />
          </div>
          )}
        </Dialog>
      )}
    </div>
  );
}

export default MovieTile;