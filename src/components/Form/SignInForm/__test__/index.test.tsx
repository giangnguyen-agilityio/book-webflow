import { useRouter } from 'next/navigation';

// Utils
import { render, screen, waitFor, userEvent, act } from '@/utils/testUtils';

// Context
import { useToast } from '@/context';

// Constants
import { ROUTES } from '@/constants';

// Mock
import { MOCK_USER } from '@/mock';

import SignInForm from '..';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/context', () => ({
  useToast: jest.fn(),
  ToastType: {
    ERROR: 'error',
  },
}));

describe('SignInForm', () => {
  const mockRouter = {
    push: jest.fn(),
  };
  const mockAddToast = jest.fn();
  const mockRemoveAllToasts = jest.fn();
  const mockOnSubmit = jest.fn();
  const user = userEvent.setup();

  const mockValidFormData = {
    username: MOCK_USER.username,
    password: MOCK_USER.password,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useToast as jest.Mock).mockReturnValue({
      addToast: mockAddToast,
      removeAllToasts: mockRemoveAllToasts,
    });
  });

  it('should render all form fields correctly', () => {
    const { container } = render(<SignInForm onSubmit={mockOnSubmit} />);

    expect(container).toMatchSnapshot();
  });

  it('should render sign in button in disabled state initially', () => {
    render(<SignInForm onSubmit={mockOnSubmit} />);

    expect(screen.getByTestId('sign-in-button')).toBeDisabled();
  });

  it('should toggle password visibility when clicking the eye icon', async () => {
    render(<SignInForm onSubmit={mockOnSubmit} />);

    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toHaveAttribute('type', 'password');

    await user.click(screen.getByLabelText('Show password'));
    expect(passwordInput).toHaveAttribute('type', 'text');

    await user.click(screen.getByLabelText('Hide password'));
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('should submit form with valid data and redirect on success', async () => {
    const mockSuccessResponse = { success: true };
    mockOnSubmit.mockResolvedValueOnce(mockSuccessResponse);

    render(<SignInForm onSubmit={mockOnSubmit} />);

    // Fill form
    await user.type(
      screen.getByTestId('username-input'),
      mockValidFormData.username,
    );
    await user.type(
      screen.getByTestId('password-input'),
      mockValidFormData.password,
    );

    // Submit form
    await user.click(screen.getByTestId('sign-in-button'));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(mockValidFormData);
      expect(mockRemoveAllToasts).toHaveBeenCalled();
      expect(mockRouter.push).toHaveBeenCalledWith(ROUTES.STORE);
    });
  });

  it('should show error toast on submission failure', async () => {
    const mockErrorResponse = {
      success: false,
      errorMessage: 'Invalid credentials',
    };
    mockOnSubmit.mockResolvedValueOnce(mockErrorResponse);

    render(<SignInForm onSubmit={mockOnSubmit} />);

    // Fill form
    await user.type(
      screen.getByTestId('username-input'),
      mockValidFormData.username,
    );
    await user.type(
      screen.getByTestId('password-input'),
      mockValidFormData.password,
    );

    // Submit form
    await user.click(screen.getByTestId('sign-in-button'));

    await waitFor(() => {
      expect(mockAddToast).toHaveBeenCalledWith('Invalid credentials', 'error');
    });
  });

  it('should clear error messages for all input fields when values change', async () => {
    render(<SignInForm onSubmit={mockOnSubmit} />);

    // Test username field
    const usernameInput = screen.getByTestId('username-input');
    await user.type(usernameInput, 'a'); // Too short username
    act(() => {
      usernameInput.blur();
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Username must be at least 3 characters/i),
      ).toBeInTheDocument();
    });

    await user.clear(usernameInput);
    await user.type(usernameInput, MOCK_USER.username);
    await waitFor(() => {
      expect(
        screen.queryByText(/Username must be at least 3 characters/i),
      ).not.toBeInTheDocument();
    });

    // Test password field
    const passwordInput = screen.getByTestId('password-input');
    await user.type(passwordInput, 'weak'); // Too short password
    act(() => {
      passwordInput.blur();
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Password must be at least 6 characters/i),
      ).toBeInTheDocument();
    });

    await user.clear(passwordInput);
    await user.type(passwordInput, MOCK_USER.password);
    await waitFor(() => {
      expect(
        screen.queryByText(/Password must be at least 6 characters/i),
      ).not.toBeInTheDocument();
    });
  });

  it('should render navigation links correctly', () => {
    render(<SignInForm onSubmit={mockOnSubmit} />);

    expect(screen.getByTestId('forgot-password-link')).toHaveAttribute(
      'href',
      ROUTES.SIGN_IN,
    );
    expect(screen.getByTestId('register-button')).toHaveAttribute(
      'href',
      ROUTES.SIGN_UP,
    );
  });
});
