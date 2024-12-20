// Utils
import { screen, wrapper, userEvent } from '@/utils/testUtils';

// Constants
import { ROUTES } from '@/constants';

// Components
import Pagination from '..';

const mockReplace = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname: () => ROUTES.STORE,
  useSearchParams: () => new URLSearchParams('?page=1'),
  useRouter: () => ({ replace: mockReplace }),
}));

describe('Pagination component', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { container } = wrapper(<Pagination total={10} />);

    expect(container).toMatchSnapshot();
  });

  it('should handle page changes', async () => {
    wrapper(<Pagination total={10} />);

    await user.click(screen.getByText('2'));

    expect(mockReplace).toHaveBeenCalledWith(`${ROUTES.STORE}?page=2`);
  });

  it('should disable prev button on first page', () => {
    wrapper(<Pagination total={10} />);

    expect(screen.getByTestId('prev-button')).toBeDisabled();
  });

  it('should disable next button on last page', () => {
    jest.spyOn(URLSearchParams.prototype, 'get').mockReturnValue('10');

    wrapper(<Pagination total={10} />);

    expect(screen.getByTestId('next-button')).toBeDisabled();
  });

  it('should handle prev button click', async () => {
    // Mock page 2 as current page
    jest.spyOn(URLSearchParams.prototype, 'get').mockReturnValue('2');

    wrapper(<Pagination total={10} />);

    await user.click(screen.getByTestId('prev-button'));

    expect(mockReplace).toHaveBeenCalledWith(`${ROUTES.STORE}?page=1`);
  });

  it('should handle next button click', async () => {
    // Mock page 1 explicitly
    jest.spyOn(URLSearchParams.prototype, 'get').mockReturnValue('1');

    wrapper(<Pagination total={10} />);

    await user.click(screen.getByTestId('next-button'));

    expect(mockReplace).toHaveBeenCalledWith(`${ROUTES.STORE}?page=2`);
  });

  it('should not call handlePageChange when clicking prev button on first page', async () => {
    wrapper(<Pagination total={10} />);

    await user.click(screen.getByTestId('prev-button'));

    expect(mockReplace).not.toHaveBeenCalled();
  });

  it('should not call handlePageChange when clicking next button on last page', async () => {
    jest.spyOn(URLSearchParams.prototype, 'get').mockReturnValue('10');

    wrapper(<Pagination total={10} />);

    await user.click(screen.getByTestId('next-button'));

    expect(mockReplace).not.toHaveBeenCalled();
  });

  it('should use DEFAULT_PAGE when no page query param exists', () => {
    // Mock empty search params
    jest.spyOn(URLSearchParams.prototype, 'get').mockReturnValue(null);

    wrapper(<Pagination total={10} />);

    expect(screen.getByTestId('prev-button')).toBeDisabled();
  });
});
