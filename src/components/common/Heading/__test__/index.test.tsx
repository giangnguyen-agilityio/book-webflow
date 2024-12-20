// Utils
import { wrapper } from '@/utils/testUtils';

// Components
import Heading from '..';

describe('Heading component', () => {
  it('should render correctly', () => {
    const { container } = wrapper(
      <Heading as="h1" size="md" textColor="text-text-primary">
        Sample Heading
      </Heading>,
    );

    expect(container).toMatchSnapshot();
  });
});
