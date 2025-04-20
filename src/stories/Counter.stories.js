import React from 'react';
import Counter from '../components/Counter/Counter';

export default {
  title: 'Components/Counter',
  component: Counter,
  argTypes: {
    initialValue: {
      control: { type: 'number' },
      defaultValue: 0,
      description: 'The initial value of the counter',
    },
  },
};

const Template = (args) => <Counter {...args} />;

// Story for the default Counter
export const Default = Template.bind({});
Default.args = {
  initialValue: 0,
};

// Story for the Counter starting at 10
export const StartingAtTen = Template.bind({});
StartingAtTen.args = {
  initialValue: 10,
};
