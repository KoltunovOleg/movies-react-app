import './genre-select.scss';

function GenreSelect({ genres, activeGenre, onSelect }) {
  const handleSelect = (genre, event) => {
    event.preventDefault();
    onSelect?.(genre);
  };

  return (
    <ul className="genre-select">
      {genres.map((genre) => (
        <li key={genre} className="genre-select__item">
          <a
            href="#"
            className={`genre-select__link ${
              genre === activeGenre ? 'selected' : ''
            }`}
            onClick={(e) => handleSelect(genre, e)}
          >
            {genre}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default GenreSelect;
