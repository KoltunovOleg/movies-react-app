import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ButtonDots from './ButtonDots';

describe('ButtonDots Component', () => {
  test('renders the ButtonDots component with three dots', () => {
    const { container } = render(<ButtonDots />);
    const buttonDots = container.querySelector('.button-dots');
    const dots = buttonDots.querySelectorAll('.dot');

    expect(buttonDots).toBeInTheDocument();
    expect(dots.length).toBe(3);
  });

  test('calls the onClick handler when clicked', async () => {
    const onClickMock = jest.fn();
    const { container } = render(<ButtonDots onClick={onClickMock} />);
    const buttonDots = container.querySelector('.button-dots');

    await userEvent.click(buttonDots);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('stops event propagation when clicked', async () => {
    const onClickMock = jest.fn();
    const onParentClickMock = jest.fn();

    const Parent = () => (
      <div onClick={onParentClickMock}>
        <ButtonDots onClick={onClickMock} />
      </div>
    );

    const { container } = render(<Parent />);
    const buttonDots = container.querySelector('.button-dots');

    await userEvent.click(buttonDots);

    expect(onClickMock).toHaveBeenCalledTimes(1);
    expect(onParentClickMock).not.toHaveBeenCalled();
  });
});