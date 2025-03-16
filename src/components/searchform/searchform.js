import React, { Component } from 'react';
import './searchform.scss'

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: props.initialQuery || ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleInputChange(event) {
    this.setState({ query: event.target.value });
  }

  handleSearch() {
    const { onSearch } = this.props;
    if (onSearch) {
      onSearch(this.state.query);
    }
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  }


  render() {
    return React.createElement(
      'div',
      { className: 'search-form' },
      React.createElement('input', {
        type: 'text',
        className: 'search-form__input',
        value: this.state.query,
        onChange: this.handleInputChange,
        onKeyPress: this.handleKeyPress,
        placeholder: 'What do you want to watch?',
      }),
      React.createElement(
        'button',
        { 
            className: 'search-form__button',
            onClick: this.handleSearch
        },
        'Search'
      )
    );
  }
}

export default SearchForm;