// Utils
import { wrapper, screen } from '@/utils/testUtils';

// Components
import Message from '..';

describe('Message component', () => {
  const defaultProps = {
    title: 'Test Title',
    description: 'Test Description',
  };

  it('renders title and description correctly', () => {
    wrapper(<Message {...defaultProps} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('applies custom classNames correctly', () => {
    const customClassNames = {
      wrapper: 'custom-wrapper',
      title: 'custom-title',
      description: 'custom-description',
    };

    wrapper(<Message {...defaultProps} classNames={customClassNames} />);

    const wrapperElement = screen.getByTestId('message-wrapper');
    const titleElement = screen.getByText('Test Title');
    const descriptionElement = screen.getByText('Test Description');

    expect(wrapperElement).toHaveClass('custom-wrapper');
    expect(titleElement).toHaveClass('custom-title');
    expect(descriptionElement).toHaveClass('custom-description');
  });
});
