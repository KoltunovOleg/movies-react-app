import React from 'react';
import Button from '../shared/Button/Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    text: { control: 'text' },
    className: {
      control: 'select',
      options: ['default', 'primary', 'secondary'],
    },
    onClick: { action: 'clicked' },
  },
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Default Button',
  className: 'default',
};

export const Primary = Template.bind({});
Primary.args = {
  text: 'Primary Button',
  className: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  text: 'Secondary Button',
  className: 'secondary',
};
