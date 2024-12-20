// Utils
import { wrapper } from '@/utils/testUtils';

// Components
import BaseSkeleton from '..';

describe('BaseSkeleton component', () => {
  it('should render correctly', () => {
    const { container } = wrapper(<BaseSkeleton />);

    expect(container).toMatchSnapshot();
  });
});
