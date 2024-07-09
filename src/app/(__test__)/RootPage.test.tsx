import { screen, render } from '@testing-library/react';
import { describe, vi, it } from 'vitest';
import RootPage from '@src/app/page';

describe('root page', () => {
  it('renders the root page', () => {
    render(<RootPage />);
    screen.debug();

    expect(screen.getByText('환영합니다.')).toBeInTheDocument();
  });
});
