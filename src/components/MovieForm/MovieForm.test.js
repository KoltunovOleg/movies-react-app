import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MovieForm from './MovieForm';
import errorMessages from '../../data/errorMessages';

describe('MovieForm Component', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  test('renders the form with all fields and default values', () => {
    render(<MovieForm onSubmit={mockOnSubmit} />);
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Release Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Movie URL/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Rating/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Genre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Runtime/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Overview/i)).toBeInTheDocument();
  });

  // test('displays validation errors for missing required fields', async () => {
  //   render(<MovieForm onSubmit={mockOnSubmit} />);

  //   // Submit the form without filling in any fields
  //   fireEvent.submit(screen.getByRole('form'));

  //   // Verify validation errors are displayed
  //   expect(screen.getByText(errorMessages.title.required)).toBeInTheDocument();
  //   expect(screen.getByText(errorMessages.release_date.required)).toBeInTheDocument();
  //   expect(screen.getByText(errorMessages.poster_path.required)).toBeInTheDocument();
  //   expect(screen.getByText(errorMessages.rating.required)).toBeInTheDocument();
  //   expect(screen.getByText(errorMessages.genre.required)).toBeInTheDocument();
  //   expect(screen.getByText(errorMessages.runtime.required)).toBeInTheDocument();
  //   expect(screen.getByText(errorMessages.overview.required)).toBeInTheDocument();
  // });

  // test('displays validation error for invalid URL', async () => {
  //   render(<MovieForm onSubmit={mockOnSubmit} />);

  //   // Enter an invalid URL
  //   userEvent.type(screen.getByLabelText(/Movie URL/i), 'invalid-url');

  //   // Submit the form
  //   fireEvent.submit(screen.getByRole('form'));

  //   // Verify validation error for invalid URL
  //   expect(screen.getByText(errorMessages.poster_path.invalid)).toBeInTheDocument();
  // });

  // test('displays validation error for rating out of range', async () => {
  //   render(<MovieForm onSubmit={mockOnSubmit} />);

  //   // Enter an invalid rating
  //   userEvent.type(screen.getByLabelText(/Rating/i), '-1'); // Below range
  //   fireEvent.submit(screen.getByRole('form'));
  //   expect(screen.getByText(errorMessages.rating.range)).toBeInTheDocument();

  //   userEvent.clear(screen.getByLabelText(/Rating/i));
  //   userEvent.type(screen.getByLabelText(/Rating/i), '11'); // Above range
  //   fireEvent.submit(screen.getByRole('form'));
  //   expect(screen.getByText(errorMessages.rating.range)).toBeInTheDocument();
  // });

  // test('displays validation error for runtime being non-positive', async () => {
  //   render(<MovieForm onSubmit={mockOnSubmit} />);

  //   // Enter a non-positive runtime
  //   userEvent.type(screen.getByLabelText(/Runtime/i), '0');
  //   fireEvent.submit(screen.getByRole('form'));

  //   // Verify validation error for non-positive runtime
  //   expect(screen.getByText(errorMessages.runtime.positive)).toBeInTheDocument();
  // });
});
