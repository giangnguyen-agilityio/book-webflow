import { useRouter } from 'next/navigation';

// Utils
import { render, screen, waitFor, userEvent, act } from '@/utils/testUtils';

// Context
import { useToast } from '@/context';

// Constants
import { ROUTES } from '@/constants';

// Mock
import { getMockSignUpData, MOCK_USER } from '@/mock';

import SignUpForm from '..';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/context', () => ({
  useToast: jest.fn(),
  ToastType: {
    ERROR: 'error',
  },
}));

describe('SignUpForm', () => {
  const mockRouter = {
    push: jest.fn(),
  };
  const mockAddToast = jest.fn();
  const mockOnSubmit = jest.fn();
  const user = userEvent.setup();

  const mockValidFormData = getMockSignUpData();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useToast as jest.Mock).mockReturnValue({ addToast: mockAddToast });
  });

  it('should render all form fields correctly', () => {
    const { container } = render(<SignUpForm onSubmit={mockOnSubmit} />);

    expect(container).toMatchSnapshot();
  });

  it('should render sign up button in disabled state initially', () => {
    render(<SignUpForm onSubmit={mockOnSubmit} />);

    expect(screen.getByTestId('sign-up-button')).toBeDisabled();
  });

  it('should show validation errors for empty required fields', async () => {
    render(<SignUpForm onSubmit={mockOnSubmit} />);

    const nameInputField = screen.getByTestId('name-input');

    await user.type(nameInputField, MOCK_USER.username);
    await user.clear(nameInputField);
    act(() => {
      nameInputField.blur();
    });

    await waitFor(() => {
      expect(screen.getByText(/Full name is required/i)).toBeInTheDocument();
    });
  });

  it('should toggle password visibility when clicking the eye icon', async () => {
    render(<SignUpForm onSubmit={mockOnSubmit} />);

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

    render(<SignUpForm onSubmit={mockOnSubmit} />);

    // Fill form
    await user.type(screen.getByTestId('name-input'), mockValidFormData.name);
    await user.type(screen.getByTestId('email-input'), mockValidFormData.email);
    await user.type(
      screen.getByTestId('username-input'),
      mockValidFormData.username,
    );
    await user.type(
      screen.getByTestId('password-input'),
      mockValidFormData.password,
    );

    // Submit form
    await user.click(screen.getByTestId('sign-up-button'));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(mockValidFormData);
      expect(mockRouter.push).toHaveBeenCalledWith(ROUTES.STORE);
    });
  });

  it('should show error toast on submission failure', async () => {
    const mockErrorResponse = {
      success: false,
      errorMessage: 'Registration failed',
    };
    mockOnSubmit.mockResolvedValueOnce(mockErrorResponse);

    render(<SignUpForm onSubmit={mockOnSubmit} />);

    // Fill form
    await user.type(screen.getByTestId('name-input'), mockValidFormData.name);
    await user.type(screen.getByTestId('email-input'), mockValidFormData.email);
    await user.type(
      screen.getByTestId('username-input'),
      mockValidFormData.username,
    );
    await user.type(
      screen.getByTestId('password-input'),
      mockValidFormData.password,
    );

    // Submit form
    await user.click(screen.getByTestId('sign-up-button'));

    await waitFor(() => {
      expect(mockAddToast).toHaveBeenCalledWith('Registration failed', 'error');
    });
  });

  it('should clear error messages for all input fields when values change', async () => {
    render(<SignUpForm onSubmit={mockOnSubmit} />);

    // Test name field
    const nameInput = screen.getByTestId('name-input');
    await user.type(nameInput, MOCK_USER.username);
    await user.clear(nameInput);
    act(() => {
      nameInput.blur();
    });

    await waitFor(() => {
      expect(screen.getByText(/Full name is required/i)).toBeInTheDocument();
    });

    await user.type(nameInput, MOCK_USER.username);
    await waitFor(() => {
      expect(
        screen.queryByText(/Full name is required/i),
      ).not.toBeInTheDocument();
    });

    // Test email field
    const emailInput = screen.getByTestId('email-input');
    await user.type(emailInput, 'invalid-email');
    act(() => {
      emailInput.blur();
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Please enter a valid email address/i),
      ).toBeInTheDocument();
    });

    await user.clear(emailInput);
    await user.type(emailInput, MOCK_USER.email);
    await waitFor(() => {
      expect(
        screen.queryByText(/Please enter a valid email address/i),
      ).not.toBeInTheDocument();
    });

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
});
