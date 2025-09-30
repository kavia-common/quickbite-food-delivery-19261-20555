import { render, screen } from '@testing-library/react';
import App from './App';

test('renders brand name', () => {
  render(<App />);
  const el = screen.getByText(/QuickBite/i);
  expect(el).toBeInTheDocument();
});
