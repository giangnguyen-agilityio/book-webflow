// Utils
import { screen, wrapper } from '@/utils/testUtils';

// Components
import BaseModal from '..';

describe('BaseModal component', () => {
  const mockOnClose = jest.fn();

  it('should render correctly', () => {
    const { container } = wrapper(
      <BaseModal isOpen onClose={mockOnClose}>
        <div>Modal Content</div>
      </BaseModal>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render modal content when open', () => {
    wrapper(
      <BaseModal isOpen onClose={mockOnClose}>
        <div>Test Content</div>
      </BaseModal>,
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should not render modal content when closed', () => {
    wrapper(
      <BaseModal isOpen={false} onClose={mockOnClose}>
        <div>Test Content</div>
      </BaseModal>,
    );

    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });
});
