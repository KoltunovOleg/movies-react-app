import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  test('renders the header with the provided title (h1)', () => {
    const pageTitle = 'My Page';
    const logoSrc = 'logo.png';
    const backgroundImage = 'background.jpg';
    render(<Header pageTitle={pageTitle} backgroundImage={backgroundImage} logo={logoSrc} />);

    const headerTitle = screen.getByRole('heading', { level: 1 });
    expect(headerTitle).toBeInTheDocument();
    expect(headerTitle).toHaveTextContent(pageTitle);
  });

  test('renders the logo with the correct src', () => {
    const pageTitle = 'My Page';
    const logoSrc = 'logo.png';
    const backgroundImage = 'background.jpg';
    render(<Header pageTitle={pageTitle} backgroundImage={backgroundImage} logo={logoSrc} />);

    const logoImage = screen.getByRole('img', { name: /logo/i });
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', logoSrc);
  });

  test('applies the background image style correctly', () => {
    const pageTitle = 'My Page';
    const logoSrc = 'logo.png';
    const backgroundImage = 'background.jpg';
    render(<Header pageTitle={pageTitle} backgroundImage={backgroundImage} logo={logoSrc} />);
  
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toHaveStyle(`background-image: url(${backgroundImage})`);
  });
});