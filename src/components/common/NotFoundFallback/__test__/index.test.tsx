// Utils
import {
  screen,
  wrapper,
  userEvent,
  ignoredConsoleError,
} from '@/utils/testUtils';

// Constants
import { ROUTES } from '@/constants';

import NotFoundFallback from '..';

describe('NotFoundFallback component', () => {
  const user = userEvent.setup();
  const mockReset = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    ignoredConsoleError();
  });

  it('should render correctly', () => {
    const { container } = wrapper(<NotFoundFallback />);

    expect(container).toMatchSnapshot();
  });

  it('should display custom title and message', () => {
    const customTitle = 'Custom Title';
    const customMessage = 'Custom Message';

    wrapper(<NotFoundFallback message={customMessage} title={customTitle} />);

    expect(screen.getByText(customTitle)).toBeInTheDocument();
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it('should call reset function when back to home button is clicked', async () => {
    wrapper(<NotFoundFallback reset={mockReset} />);

    await user.click(screen.getByLabelText('Back to home button'));

    expect(mockReset).toHaveBeenCalled();
  });

  it('should have correct link to home page', () => {
    wrapper(<NotFoundFallback />);

    const homeButton = screen.getByLabelText('Back to home button');

    expect(homeButton).toHaveAttribute('href', ROUTES.STORE);
  });
});
