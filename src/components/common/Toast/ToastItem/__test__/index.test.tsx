// Utils
import { screen, wrapper, userEvent } from '@/utils/testUtils';

// Components
import ToastItem from '..';

describe('ToastItem component', () => {
  const mockProps = {
    id: 1,
    message: 'Test message',
    type: 'success' as const,
    removeToast: jest.fn(),
  };

  const user = userEvent.setup();

  it('should render correctly', () => {
    const { container } = wrapper(<ToastItem {...mockProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should call removeToast when close button is clicked', async () => {
    wrapper(<ToastItem {...mockProps} />);

    await user.click(screen.getByLabelText('Close notification'));

    expect(mockProps.removeToast).toHaveBeenCalledWith(mockProps.id);
  });
});
