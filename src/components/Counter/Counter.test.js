import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Counter from './Counter';

describe('Counter Component', () => {
  test('renders initial value provided in props', () => {
    render(<Counter initialValue={1} />);
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });

  test('clicking "decrement" button decrements the displayed value', () => {
    render(<Counter initialValue={1} />);

    const decrementButton = screen.getByRole('button', { name: /decrement/i });

    userEvent.click(decrementButton);

    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });

  test('clicking "increment" button increments the displayed value', () => {
    render(<Counter initialValue={1} />);

    const incrementButton = screen.getByRole('button', { name: /increment/i });

    userEvent.click(incrementButton);

    expect(screen.getByText('Count: 2')).toBeInTheDocument();
  });
});
