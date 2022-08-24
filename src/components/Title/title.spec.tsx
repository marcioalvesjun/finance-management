import { render, screen } from '@testing-library/react';
import { Title } from '.';

describe('<Title />', () => {
  it('should render', () => {
    render(<Title>Test</Title>);
    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });
});
