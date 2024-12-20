// Utils
import { screen, wrapper, userEvent } from '@/utils/testUtils';

// Constants
import { ROUTES } from '@/constants';

// Components
import ErrorFallback from '..';

describe('ErrorFallback component', () => {
  const user = userEvent.setup();
  const mockReset = jest.fn();

  it('should render correctly', () => {
    const { container } = wrapper(<ErrorFallback />);

    expect(container).toMatchSnapshot();
  });

  it('should display error message when provided', () => {
    const errorMessage = 'Test error message';
    wrapper(<ErrorFallback message={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('should call reset function when reset button is clicked', async () => {
    wrapper(<ErrorFallback reset={mockReset} />);

    await user.click(screen.getByText(/reset the page/i));

    expect(mockReset).toHaveBeenCalled();
  });

  it('should have link to home page', () => {
    wrapper(<ErrorFallback />);

    const homeLink = screen.getByText(/back to home/i);

    expect(homeLink).toHaveAttribute('href', ROUTES.STORE);
  });
});
