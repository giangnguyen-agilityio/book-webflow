// Utils
import { wrapper } from '@/utils/testUtils';

// Components
import BenefitItem from '..';

// Mock icon component
const MockIcon = () => <svg data-testid="mock-icon" />;

describe('BenefitItem', () => {
  const defaultProps = {
    Icon: MockIcon,
    title: 'Test Title',
    description: 'Test Description',
  };

  it('should renders correctly with all props', () => {
    const { container } = wrapper(<BenefitItem {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });
});
