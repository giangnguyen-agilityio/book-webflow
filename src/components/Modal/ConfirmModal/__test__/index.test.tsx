// Utils
import { screen, wrapper, userEvent } from '@/utils/testUtils';

jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  LazyMotion: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Components
import ConfirmModal from '..';

describe('ConfirmModal component', () => {
  const defaultProps = {
    title: 'Test Title',
    description: 'Test Description',
    isOpen: true,
    isLoading: false,
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly when open', () => {
    const { container } = wrapper(<ConfirmModal {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should handle confirm action', async () => {
    const user = userEvent.setup();

    wrapper(<ConfirmModal {...defaultProps} />);

    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    await user.click(confirmButton);

    expect(defaultProps.onConfirm).toHaveBeenCalled();
  });

  it('should handle cancel action', async () => {
    const user = userEvent.setup();

    wrapper(<ConfirmModal {...defaultProps} />);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    expect(defaultProps.onCancel).toHaveBeenCalled();
  });

  it('should handle close button action', async () => {
    const user = userEvent.setup();

    wrapper(<ConfirmModal {...defaultProps} />);

    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);

    expect(defaultProps.onCancel).toHaveBeenCalled();
  });

  it('should disable buttons when loading', () => {
    wrapper(<ConfirmModal {...defaultProps} isLoading={true} />);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    const confirmButton = screen.getByRole('button', { name: /confirm/i });

    expect(cancelButton).toBeDisabled();
    expect(confirmButton).toHaveAttribute('data-loading', 'true');
  });

  it('should not render when closed', () => {
    wrapper(<ConfirmModal {...defaultProps} isOpen={false} />);

    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument();
  });
});
