// Utils
import { screen, wrapper, userEvent } from '@/utils/testUtils';

// Components
import ComingSoon from '..';

describe('ComingSoon component', () => {
  const user = userEvent.setup();

  it('should render correctly', () => {
    const { container } = wrapper(<ComingSoon />);

    expect(container).toMatchSnapshot();
  });

  it('should allow email input interaction', async () => {
    wrapper(<ComingSoon />);

    const emailInput = screen.getByPlaceholderText(
      'Enter your email',
    ) as HTMLInputElement;
    const testEmail = 'test@example.com';

    await user.type(emailInput, testEmail);

    expect(emailInput.value).toBe(testEmail);
  });
});
