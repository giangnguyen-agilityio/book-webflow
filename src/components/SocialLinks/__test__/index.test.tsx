// Utils
import { wrapper } from '@/utils/testUtils';

// Icons
import { FacebookIcon } from '@/icons';

// Components
import SocialLinks from '..';

describe('SocialLinks component', () => {
  it('should render correctly with default props', () => {
    const { container } = wrapper(
      <SocialLinks
        Icon={FacebookIcon}
        title="Facebook"
        url="https://facebook.com"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with custom class', () => {
    const { container } = wrapper(
      <SocialLinks
        customClass="custom-social-link"
        Icon={FacebookIcon}
        title="Facebook"
        url="https://facebook.com"
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
