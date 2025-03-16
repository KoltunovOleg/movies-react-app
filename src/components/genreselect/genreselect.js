import React, { Component } from 'react';
import './genreselect.scss'

class GenreSelect extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(genre) {
    const { onSelect } = this.props;
    if (onSelect) {
      onSelect(genre);
    }
  }


  render() {
    const { genres, selectedGenre } = this.props;

    return React.createElement(
      'ul',
      { className: 'genre-select' },
      ...genres.map((genre) =>
        React.createElement(
          'li',
          { key: genre, className: 'genre-select__item' },
          React.createElement(
            'a',
            {
              href: '#',
              className: `genre-select__link ${
                genre === selectedGenre ? 'selected' : ''
              }`,
              onClick: (e) => {
                e.preventDefault();
                this.handleSelect(genre);
              },
            },
            genre
          )
        )
      )
    );
  }
}

export default GenreSelect;