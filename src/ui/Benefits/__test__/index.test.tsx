// Utils
import { wrapper } from '@/utils/testUtils';

// Components
import Benefits from '..';

describe('Benefits component', () => {
  it('should match snapshot', () => {
    const { container } = wrapper(<Benefits />);

    expect(container).toMatchSnapshot();
  });
});
