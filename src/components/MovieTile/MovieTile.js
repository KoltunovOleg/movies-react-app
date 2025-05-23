import { useState } from 'react';
import ButtonDots from '../../shared/ButtonDots/ButtonDots';
import DropdownMenu from '../../shared/DropdownMenu/DropdownMenu';
import Dialog from '../../shared/Dialog/Dialog';
import Button from '../../shared/Button/Button';
import MovieForm from '../MovieForm/MovieForm';
import './movie-tile.scss';

function MovieTile({ movie, onClick }) {
  const { poster_path, title, release_date, genres } = movie;

  const [showSelector, setShowSelector] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  const [dialogType, setDialogType] = useState('');

  const openSelector = () => setShowSelector(true);
  const closeSelector = () => setShowSelector(false);

  const openDialog = (type, content) => {
    setDialogType(type);
    setDialogContent(content);
    setShowDialog(true);
  };

  const closeDialog = () => {
    setDialogType('');
    setDialogContent('');
    setShowDialog(false);
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
      <ButtonDots onClick={openSelector} />
      <img
        className="movie-tile__image"
        src={poster_path}
        alt={`${title} poster`}
      />
      <div className="movie-tile__info">
        <h3 className="movie-tile__title">{title}</h3>
        <span className="movie-tile__year">
          {new Date(release_date).getFullYear()}
        </span>
        <p className="movie-tile__genres">{genres.join(', ')}</p>
      </div>
      {showSelector && (
        <DropdownMenu
          items={['Edit', 'Delete']}
          onClose={closeSelector}
          onSelect={handleSelect}
        />
      )}
      {showDialog && (
        <Dialog title={dialogContent} onClose={closeDialog}>
          {dialogType === 'Edit' ? (
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
