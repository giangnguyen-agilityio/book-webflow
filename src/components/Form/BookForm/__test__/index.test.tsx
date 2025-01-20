import { useRouter } from 'next/navigation';

// Utils
import { render, screen, waitFor, userEvent, act } from '@/utils/testUtils';

// Context
import { useToast } from '@/context';

// Mock
import { MOCK_DEFAULT_BOOK_ITEM } from '@/mock';

import BookForm from '..';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/context', () => ({
  useToast: jest.fn(),
  ToastType: {
    ERROR: 'error',
    SUCCESS: 'success',
  },
}));

describe('BookForm component', () => {
  const mockRouter = {
    push: jest.fn(),
    back: jest.fn(),
  };
  const mockAddToast = jest.fn();
  const mockOnSubmit = jest.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useToast as jest.Mock).mockReturnValue({ addToast: mockAddToast });
  });

  it('should render all form fields correctly', () => {
    const { container } = render(<BookForm onSubmit={mockOnSubmit} />);

    expect(container).toMatchSnapshot();
  });

  it('should render add/update button based on mode', () => {
    const { rerender } = render(<BookForm onSubmit={mockOnSubmit} />);
    expect(
      screen.getByRole('button', { name: 'Add new book' }),
    ).toBeInTheDocument();

    rerender(
      <BookForm data={MOCK_DEFAULT_BOOK_ITEM} onSubmit={mockOnSubmit} />,
    );

    expect(
      screen.getByRole('button', { name: 'Add new book' }),
    ).toHaveTextContent('Update Book');
  });

  describe('Field validations', () => {
    beforeEach(() => {
      render(<BookForm onSubmit={mockOnSubmit} />);
    });

    const validateField = async (
      input: HTMLElement,
      errorMessage: RegExp,
      validValue: string,
    ) => {
      await user.click(input);

      act(() => {
        input.blur();
      });

      await waitFor(() => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });

      await user.type(input, validValue);

      await waitFor(() => {
        expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
      });
    };

    const validateFieldWithInvalidValue = async (
      input: HTMLElement,
      invalidValue: string,
      errorMessage: RegExp,
      validValue: string,
    ) => {
      await user.type(input, invalidValue);

      act(() => {
        input.blur();
      });

      await waitFor(() => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });

      await user.type(input, validValue);

      await waitFor(() => {
        expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
      });
    };

    describe('Basic Information Fields', () => {
      it('should validate title field', async () => {
        const input = screen.getByTestId('book-title-input');

        await validateField(input, /Please enter a book title/i, 'Valid Title');
      });

      it('should validate price field', async () => {
        const input = screen.getByTestId('book-price-input');

        await validateFieldWithInvalidValue(
          input,
          'test',
          /Please enter a valid price/i,
          '20',
        );
      });

      it('should validate description field', async () => {
        const input = screen.getByTestId('book-description-input');

        await validateFieldWithInvalidValue(
          input,
          'short',
          /Description must be at least 10 characters/i,
          ' description that is long enough',
        );
      });
    });

    describe('Publishing Information Fields', () => {
      it('should validate publisher field', async () => {
        const input = screen.getByTestId('book-publisher-input');

        await validateField(
          input,
          /Please enter a publisher name/i,
          'Valid Publisher',
        );
      });

      it('should validate published date field', async () => {
        const input = screen.getByTestId('book-published-date-input');

        await validateField(
          input,
          /Please select a published date/i,
          '2024-03-20',
        );
      });

      it('should validate ISBN field', async () => {
        const input = screen.getByTestId('book-isbn-input');

        await validateField(input, /Please enter an ISBN/i, '1234567890');
      });
    });

    describe('Physical Attributes Fields', () => {
      it('should validate length field', async () => {
        const input = screen.getByTestId('book-length-input');

        await validateFieldWithInvalidValue(
          input,
          'test',
          /Please enter a valid dimension/i,
          '10',
        );
      });

      it('should validate width field', async () => {
        const input = screen.getByTestId('book-width-input');

        await validateFieldWithInvalidValue(
          input,
          'test',
          /Please enter a valid dimension/i,
          '10',
        );
      });

      it('should validate height field', async () => {
        const input = screen.getByTestId('book-height-input');

        await validateFieldWithInvalidValue(
          input,
          'test',
          /Please enter a valid dimension/i,
          '10',
        );
      });

      it('should validate paperback field', async () => {
        const input = screen.getByTestId('book-paperback-input');
        await validateFieldWithInvalidValue(
          input,
          'test',
          /Please enter a valid number of pages/i,
          '200',
        );
      });
    });

    describe('Additional Information Fields', () => {
      it('should validate label field', async () => {
        const input = screen.getByTestId('book-label-input');

        await validateField(input, /Please enter a book label/i, 'Valid Label');
      });

      it('should validate quantity field', async () => {
        const input = screen.getByTestId('book-quantity-input');

        await validateFieldWithInvalidValue(
          input,
          'test',
          /Please enter a valid quantity/i,
          '10',
        );
      });

      it('should validate language field', async () => {
        const input = screen.getByTestId('book-language-input');

        await validateField(
          input,
          /Please enter a language/i,
          'Valid Language',
        );
      });
    });
  });
});
