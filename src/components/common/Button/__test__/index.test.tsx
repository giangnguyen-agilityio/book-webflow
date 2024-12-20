// Utils
import { screen, wrapper, userEvent } from '@/utils/testUtils';

// Icons
import { CloseIcon } from '@/icons';

// Components
import { Button } from '..';

describe('Button component', () => {
  const user = userEvent.setup();

  it('should render correctly', () => {
    const { container } = wrapper(<Button>Click me</Button>);

    expect(container).toMatchSnapshot();
  });

  it('should handle click events', async () => {
    const handleClick = jest.fn();

    wrapper(<Button onPress={handleClick}>Click me</Button>);

    await user.click(screen.getByRole('button', { name: /click me/i }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    wrapper(<Button disabled>Disabled Button</Button>);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should render with icon when isIconOnly is true', () => {
    wrapper(
      <Button isIconOnly aria-label="Icon Button">
        <CloseIcon />
      </Button>,
    );

    expect(screen.getByLabelText('Icon Button')).toBeInTheDocument();
  });
});
