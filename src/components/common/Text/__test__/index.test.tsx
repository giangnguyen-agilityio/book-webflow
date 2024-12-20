// Utils
import { screen, wrapper } from '@/utils/testUtils';

// Components
import Text from '..';

describe('Text component', () => {
  it('should render correctly', () => {
    const { container } = wrapper(
      <Text size="md" textColor="text-text-primary">
        Sample Text
      </Text>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render as different HTML elements', () => {
    wrapper(<Text as="span">Span Text</Text>);

    expect(screen.getByText('Span Text').tagName).toBe('SPAN');
  });

  it('should handle text wrapping', () => {
    wrapper(<Text type="wrap">Wrapping Text</Text>);

    expect(screen.getByText('Wrapping Text')).toHaveClass('break-words');
  });
});
