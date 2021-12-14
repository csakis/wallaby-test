/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './src/App';

describe('first test', () => {
  it('should be in the document', () => {
    render(<App />);
    const text = screen.getByText(/hello vite/i);
    expect(text).toBeInTheDocument();
  });
});
