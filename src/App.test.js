import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders the header with the correct title and logo', () => {
    render(<App />);
    const headerTitle = screen.getByText(/My Movie App/i);
    const logo = screen.getByAltText(/logo/i);

    expect(headerTitle).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
  });
});