import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button Component', () => {
  test('renders button with provided text', () => {
    render(<Button text="Button Text" />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Button Text');
  });

  test('applies the default className when no className is provided', () => {
    render(<Button text="Button Text" />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('btn btn-default');
  });

  test('applies the provided className', () => {
    render(<Button text="Button Text" className="primary" />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('btn btn-primary');
  });

  test('calls the onClick handler when clicked', async () => {
    const onClickMock = jest.fn();
    render(<Button text="Click Me" onClick={onClickMock} />);
    const buttonElement = screen.getByRole('button');
    await userEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
