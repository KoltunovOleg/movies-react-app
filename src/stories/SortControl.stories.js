import React, { useState } from 'react';
import SortControl from '../components/SortControl/SortControl';

export default {
  title: 'Components/SortControl',
  component: SortControl,
};

const Template = (args) => {
  const [sortValue, setSortValue] = useState(args.currentSelection);

  return (
    <SortControl
      {...args}
      currentSelection={sortValue}
      onSortChange={(newValue) => {
        setSortValue(newValue);
        args.onSortChange(newValue);
      }}
    />
  );
};

// Default story
export const Default = Template.bind({});
Default.args = {
  currentSelection: 'releaseDate',
  onSortChange: (value) => {
    console.log('Sort changed to:', value);
  },
};

// Story for when "Title" is selected by default
export const TitleSelected = Template.bind({});
TitleSelected.args = {
  currentSelection: 'title',
  onSortChange: (value) => {
    console.log('Sort changed to:', value);
  },
};

// Story with no `onSortChange` callback provided
export const NoCallback = Template.bind({});
NoCallback.args = {
  currentSelection: 'releaseDate',
};