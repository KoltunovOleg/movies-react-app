import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  test('renders the logo with the correct src', () => {
    const backgroundImage = 'background.jpg';
    render(
      <Header
        backgroundImage={backgroundImage}
        renderActionButton={() => <button>Action</button>}
      />
    );

    const logoImage = screen.getByRole('img', { name: /logo/i });
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', '/logo.png'); // Hardcoded logo src in the component
  });

  test('applies the background image style correctly', () => {
    const backgroundImage = 'background.jpg';
    render(
      <Header
        backgroundImage={backgroundImage}
        renderActionButton={() => <button>Action</button>}
      />
    );

    const headerElement = screen.getByRole('banner'); // Assuming "banner" is the semantic role for the header
    expect(headerElement).toHaveStyle(
      `background-image: url(${backgroundImage})`
    );
  });

  test('renders the action button provided by renderActionButton', () => {
    const backgroundImage = 'background.jpg';
    render(
      <Header
        backgroundImage={backgroundImage}
        renderActionButton={() => <button>Action</button>}
      />
    );

    const actionButton = screen.getByRole('button', { name: /action/i });
    expect(actionButton).toBeInTheDocument();
  });

  test('renders children inside the header__children container', () => {
    const backgroundImage = 'background.jpg';
    render(
      <Header
        backgroundImage={backgroundImage}
        renderActionButton={() => <button>Action</button>}
      >
        <div>Child Content</div>
      </Header>
    );

    const childContent = screen.getByText('Child Content');
    expect(childContent).toBeInTheDocument();
  });
});
