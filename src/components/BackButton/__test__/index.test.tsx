import { useRouter } from 'next/navigation';

// Utils
import { wrapper, screen, userEvent } from '@/utils/testUtils';

// Components
import BackButton from '..';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

describe('BackButton component', () => {
  // Setup mock router before each test
  const mockBack = jest.fn();
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render a button with "back" text', () => {
    wrapper(<BackButton />);

    const button = screen.getByRole('button', { name: /back/i });

    expect(button).toBeInTheDocument();
  });

  it('should apply the provided custom CSS class to the button', () => {
    const customClass = 'test-custom-class';
    wrapper(<BackButton customClass={customClass} />);

    const button = screen.getByRole('button', { name: /back/i });

    expect(button).toHaveClass(customClass);
  });

  it('should navigate back when the button is clicked', async () => {
    const user = userEvent.setup();
    wrapper(<BackButton />);

    const button = screen.getByRole('button', { name: /back/i });
    await user.click(button);

    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
