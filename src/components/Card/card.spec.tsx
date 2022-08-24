import { render, screen } from '@testing-library/react';
import { Card } from '.';

const MockIcon = () => <span data-testid="mock-icon" />;

describe('<Card />', () => {
  it('should render', () => {
    render(<Card icon={MockIcon} title="Card" value="10" />);
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /card/i })).toBeInTheDocument();
    expect(screen.getByText(/\$10\.00/i)).toBeInTheDocument();
  });
});
