import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DropdownMenu from './DropdownMenu';

describe('DropdownMenu Component', () => {
  const mockItems = ['Option 1', 'Option 2', 'Option 3'];

  test('renders the DropdownMenu component with items', () => {
    render(<DropdownMenu items={mockItems} />);

    const options = screen.getAllByRole('listitem');
    expect(options).toHaveLength(mockItems.length);

    mockItems.forEach((item, index) => {
      expect(options[index]).toHaveTextContent(item);
    });
  });

  test('calls onClose when the close button is clicked', async () => {
    const onCloseMock = jest.fn();
    render(<DropdownMenu items={mockItems} onClose={onCloseMock} />);

    const closeButton = screen.getByRole('button', { name: /×/i });
    await userEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('calls onSelect with the correct item when an option is clicked', async () => {
    const onSelectMock = jest.fn();
    render(<DropdownMenu items={mockItems} onSelect={onSelectMock} />);

    const options = screen.getAllByRole('listitem');

    await userEvent.click(options[1]);
    expect(onSelectMock).toHaveBeenCalledTimes(1);
    expect(onSelectMock).toHaveBeenCalledWith('Option 2');
  });

  test('does not propagate click events when clicking inside the selector', async () => {
    const onParentClickMock = jest.fn();

    const Parent = () => (
      <div onClick={onParentClickMock}>
        <DropdownMenu items={mockItems} />
      </div>
    );

    render(<Parent />);
    const selector = screen.getByRole('list');

    await userEvent.click(selector);
    expect(onParentClickMock).not.toHaveBeenCalled();
  });
});