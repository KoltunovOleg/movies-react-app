import React, { useState } from 'react';
import GenreSelect from '../components/GenreSelect/GenreSelect';

export default {
  title: 'Components/GenreSelect',
  component: GenreSelect,
  argTypes: {
    genres: {
      control: { type: 'array' },
      defaultValue: ['All', 'Documentary', 'Comedy', 'Horror', 'Crime'],
      description: 'List of genres to display',
    },
    selectedGenre: {
      control: { type: 'text' },
      defaultValue: 'All',
      description: 'The currently selected genre',
    },
    onSelect: { action: 'onSelect' },
  },
};

const Template = (args) => {
  const [selectedGenre, setSelectedGenre] = useState(args.selectedGenre);

  const handleSelect = (genre) => {
    setSelectedGenre(genre);
    args.onSelect(genre);
  };

  return (
    <GenreSelect
      {...args}
      selectedGenre={selectedGenre}
      onSelect={handleSelect}
    />
  );
};

// Default story
export const Default = Template.bind({});
Default.args = {
  genres: ['All', 'Documentary', 'Comedy', 'Horror', 'Crime'],
  selectedGenre: 'All',
};

// Story with a preselected genre
export const PreselectedGenre = Template.bind({});
PreselectedGenre.args = {
  genres: ['All', 'Documentary', 'Comedy', 'Horror', 'Crime'],
  selectedGenre: 'Comedy',
};
