// Utils
import { screen, wrapper, userEvent } from '@/utils/testUtils';

// Components
import Input from '..';

describe('Input component', () => {
  const user = userEvent.setup();

  it('should render correctly', () => {
    const { container } = wrapper(<Input placeholder="Enter text" />);

    expect(container).toMatchSnapshot();
  });

  it('should handle user input', async () => {
    wrapper(<Input placeholder="Enter text" />);

    const input = screen.getByPlaceholderText('Enter text');
    await user.type(input, 'Hello World');

    expect(input).toHaveValue('Hello World');
  });

  it('should render with different sizes', () => {
    wrapper(<Input placeholder="Large input" size="lg" />);

    const input = screen.getByPlaceholderText('Large input');

    expect(input.closest('div')).toHaveClass('h-full');
  });
});
