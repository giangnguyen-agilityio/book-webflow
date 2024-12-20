// Utils
import { screen, wrapper } from '@/utils/testUtils';

// Context
import { useToast } from '@/context';

// Components
import Toast from '..';

jest.mock('@/context', () => ({
  ...jest.requireActual('@/context'),
  useToast: jest.fn().mockReturnValue({
    toasts: [],
    addToast: jest.fn(),
    removeToast: jest.fn(),
  }),
}));

describe('Toast component', () => {
  const mockToasts = [
    { id: 1, message: 'Test message 1', type: 'success' },
    { id: 2, message: 'Test message 2', type: 'error' },
  ];

  beforeEach(() => {
    (useToast as jest.Mock).mockReturnValue({
      toasts: mockToasts,
      removeToast: jest.fn(),
    });
  });

  it('should render correctly', () => {
    const { container } = wrapper(<Toast />);

    expect(container).toMatchSnapshot();
  });

  it('should render all toast messages', () => {
    wrapper(<Toast />);

    mockToasts.forEach(({ message }) => {
      expect(screen.getByText(message)).toBeInTheDocument();
    });
  });
});
