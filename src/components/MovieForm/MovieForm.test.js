import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router';
import MovieForm from './MovieForm';
import { API_URL } from '../../constants';

// Mock useNavigate
jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
}));

// Mock fetch
global.fetch = jest.fn();

describe('MovieForm Component', () => {
  let navigateMock;

  beforeEach(() => {
    // Mock navigate function
    navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    // Add dialog-root to the DOM for portal rendering
    const dialogRoot = document.createElement('div');
    dialogRoot.setAttribute('id', 'dialog-root');
    document.body.appendChild(dialogRoot);
  });

  afterEach(() => {
    // Clean up dialog-root
    const dialogRoot = document.getElementById('dialog-root');
    if (dialogRoot) {
      document.body.removeChild(dialogRoot);
    }

    // Reset mocks
    jest.clearAllMocks();
  });

  it('renders the form with correct initial values', () => {
    const initialMovieInfo = {
      title: 'Documentary Film',
      release_date: '2022-01-01',
      poster_path: 'https://example.com/poster.jpg',
      vote_average: 7.5,
      genres: ['Documentary', 'Crime'],
      runtime: 120,
      overview: 'A deep dive into the world of documentaries.',
    };

    render(<MovieForm initialMovieInfo={initialMovieInfo} />);

    expect(screen.getByLabelText(/title/i)).toHaveValue('Documentary Film');
    expect(screen.getByLabelText(/release date/i)).toHaveValue('2022-01-01');
    expect(screen.getByLabelText(/movie url/i)).toHaveValue('https://example.com/poster.jpg');
    expect(screen.getByLabelText(/rating/i)).toHaveValue(7.5);
    expect(screen.getByLabelText(/runtime/i)).toHaveValue(120);
    expect(screen.getByLabelText(/overview/i)).toHaveValue('A deep dive into the world of documentaries.');

    const genreOptions = screen.getByLabelText(/genre/i).options;
    expect(Array.from(genreOptions).map((option) => option.value)).not.toContain('All');
  });

  it('validates required fields and displays error messages', async () => {
    render(<MovieForm />);
  
    fireEvent.click(screen.getByText(/submit/i));
  
    await waitFor(() => {
      expect(screen.getByText(/title is required/i)).toBeInTheDocument();
      expect(screen.getByText(/release date is required/i)).toBeInTheDocument();
      expect(screen.getByText(/movie URL is required/i)).toBeInTheDocument();
      expect(screen.getByText(/rating is required/i)).toBeInTheDocument();
      expect(screen.getByText(/at least one genre must be selected/i)).toBeInTheDocument();
      expect(screen.getByText(/runtime is required/i)).toBeInTheDocument();
      expect(screen.getByText(/overview is required/i)).toBeInTheDocument();
    });
  });

  it('submits the form and navigates on success', async () => {
    const mockResponse = { id: 123 };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    render(<MovieForm method="POST" />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Documentary Film' } });
    fireEvent.change(screen.getByLabelText(/release date/i), { target: { value: '2022-01-01' } });
    fireEvent.change(screen.getByLabelText(/movie url/i), { target: { value: 'https://example.com/poster.jpg' } });
    fireEvent.change(screen.getByLabelText(/rating/i), { target: { value: '7.5' } });
    fireEvent.change(screen.getByLabelText(/runtime/i), { target: { value: '120' } });
    fireEvent.change(screen.getByLabelText(/overview/i), { target: { value: 'A deep dive into the world of documentaries.' } });
    fireEvent.change(screen.getByLabelText(/genre/i), { target: { value: 'Documentary' } });

    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(API_URL, expect.any(Object));
      expect(navigateMock).toHaveBeenCalledWith('/123');
    });
  });

  it('handles API failure gracefully', async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    render(<MovieForm method="POST" />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Documentary Film' } });
    fireEvent.change(screen.getByLabelText(/release date/i), { target: { value: '2022-01-01' } });
    fireEvent.change(screen.getByLabelText(/movie url/i), { target: { value: 'https://example.com/poster.jpg' } });
    fireEvent.change(screen.getByLabelText(/rating/i), { target: { value: '7.5' } });
    fireEvent.change(screen.getByLabelText(/runtime/i), { target: { value: '120' } });
    fireEvent.change(screen.getByLabelText(/overview/i), { target: { value: 'A deep dive into the world of documentaries.' } });
    fireEvent.change(screen.getByLabelText(/genre/i), { target: { value: 'Documentary' } });

    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(API_URL, expect.any(Object));
      expect(navigateMock).not.toHaveBeenCalled();
    });
  });

  it('resets the form when the reset button is clicked', () => {
    render(<MovieForm />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Documentary Film' } });
    fireEvent.change(screen.getByLabelText(/release date/i), { target: { value: '2022-01-01' } });

    fireEvent.click(screen.getByText(/reset/i));

    expect(screen.getByLabelText(/title/i)).toHaveValue('');
    expect(screen.getByLabelText(/release date/i)).toHaveValue('');
  });
});