// Utils
import { wrapper } from '@/utils/testUtils';

// Components
import NewsletterSignup from '..';

describe('NewsletterSignup component', () => {
  it('should match snapshot', () => {
    const { container } = wrapper(<NewsletterSignup />);

    expect(container).toMatchSnapshot();
  });
});
