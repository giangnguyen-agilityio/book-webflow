// Utils
import { wrapper } from '@/utils/testUtils';

// Components
import LoadingIndicator from '..';

describe('LoadingIndicator component', () => {
  it('should render correctly with default props', () => {
    const { container } = wrapper(<LoadingIndicator />);

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with custom props', () => {
    const { container } = wrapper(
      <LoadingIndicator
        containerClassName="custom-container"
        fullScreen={false}
        label="Loading..."
        labelClassName="custom-label"
        size="sm"
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
