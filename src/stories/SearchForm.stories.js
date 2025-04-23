import React from 'react';
import SearchForm from '../components/SearchForm/SearchForm';

export default {
  title: 'Components/SearchForm',
  component: SearchForm,
  argTypes: {
    initialQuery: {
      control: { type: 'text' },
      defaultValue: '',
      description: 'The initial value of the search input',
    },
    onSearch: { action: 'onSearch' },
  },
};

const Template = (args) => <SearchForm {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
  initialQuery: '',
};

// Story with a prefilled query
export const PrefilledQuery = Template.bind({});
PrefilledQuery.args = {
  initialQuery: 'React',
};

// Story with a long query
export const LongQuery = Template.bind({});
LongQuery.args = {
  initialQuery:
    'A long search query that demonstrates how the input handles larger text',
};
