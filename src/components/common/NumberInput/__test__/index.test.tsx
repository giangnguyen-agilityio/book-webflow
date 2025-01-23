import { wrapper, userEvent, screen } from '@/utils/testUtils';

import NumberInput from '..';

describe('NumberInput component', () => {
  it('handles valid number input', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    wrapper(<NumberInput label="Test Input" onChange={handleChange} />);
    const input = screen.getByLabelText('Test Input');

    await user.type(input, '123');

    expect(handleChange).toHaveBeenCalled();
  });
});
