import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App Component', () => {
  beforeEach(() => {
    const dialogRoot = document.createElement('div');
    dialogRoot.setAttribute('id', 'dialog-root');
    document.body.appendChild(dialogRoot);
  });

  afterEach(() => {
    const dialogRoot = document.getElementById('dialog-root');
    if (dialogRoot) {
      document.body.removeChild(dialogRoot);
    }
  });

  test('stops event propagation when "+Add movie" button is clicked', async () => {
    render(<App />);

    const addMovieButton = screen.getByText('+Add movie');

    const event = new MouseEvent('click', { bubbles: true });
    jest.spyOn(event, 'stopPropagation');

    addMovieButton.dispatchEvent(event);

    expect(event.stopPropagation).toHaveBeenCalled();
  });

  test('renders the header with the correct title and logo', () => {
    render(<App />);
    const headerTitle = screen.getByText(/My Movie App/i);
    const logo = screen.getByAltText(/logo/i);

    expect(headerTitle).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
  });
});
