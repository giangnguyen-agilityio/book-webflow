// Utils
import { screen, waitFor, wrapper, act, fireEvent } from '@/utils/testUtils';

// Constants
import { BOOK_MESSAGES, MAX_FILE_SIZE } from '@/constants';

import ImageUpload from '..';

const mockAddToast = jest.fn();

// Mock the useToast hook
jest.mock('@/context', () => ({
  ...jest.requireActual('@/context'),
  useToast: () => ({
    addToast: mockAddToast,
  }),
}));

const createFile = (name: string, size: number, type: string): File => {
  const file = new File([''], name, { type });
  Object.defineProperty(file, 'size', { value: size });
  return file;
};

interface MockFileReader extends Partial<FileReader> {
  readAsDataURL: jest.Mock;
  result?: string;
  onloadend: (() => void) | null;
  onerror: (() => void) | null;
}

describe('ImageUpload', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    wrapper(<ImageUpload />);

    expect(screen.getByText('Select Image')).toBeInTheDocument();
    expect(
      screen.getByText('Accepted formats: JPEG, PNG, WebP'),
    ).toBeInTheDocument();
    expect(screen.getByText('Maximum file size: 5MB')).toBeInTheDocument();
  });

  it('displays error message when provided', () => {
    const errorMessage = 'Test error message';

    wrapper(<ImageUpload error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('shows preview when value prop is provided', () => {
    const imageUrl = 'data:image/jpeg;base64,test123';

    wrapper(<ImageUpload value={imageUrl} />);

    expect(screen.getByAltText('Preview')).toBeInTheDocument();
  });

  it('handles file size validation', async () => {
    wrapper(<ImageUpload />);

    const input = screen.getByTestId('image-upload-input');
    const oversizedFile = createFile(
      'test.jpg',
      MAX_FILE_SIZE + 1,
      'image/jpeg',
    );

    await act(async () => {
      fireEvent.change(input, { target: { files: [oversizedFile] } });
    });

    await waitFor(() => {
      expect(mockAddToast).toHaveBeenCalledWith(
        BOOK_MESSAGES.IMAGE_SIZE_TOO_LARGE,
        'error',
      );
    });
  });

  it('handles invalid file type validation', async () => {
    wrapper(<ImageUpload />);

    const input = screen.getByTestId('image-upload-input');
    const invalidFile = createFile('test.pdf', 1024, 'application/pdf');

    await act(async () => {
      fireEvent.change(input, { target: { files: [invalidFile] } });
    });

    await waitFor(
      () => {
        expect(mockAddToast).toHaveBeenCalledWith(
          BOOK_MESSAGES.ONLY_IMAGE_FILES_ALLOWED,
          'error',
        );
      },
      { timeout: 3000 },
    );
  });

  it('handles successful image upload', async () => {
    const onChangeMock = jest.fn();

    wrapper(<ImageUpload onChange={onChangeMock} />);

    const input = screen.getByTestId('image-upload-input');
    const validFile = createFile('test.jpg', 1024, 'image/jpeg');

    const mockFileReader: MockFileReader = {
      readAsDataURL: jest.fn(),
      result: 'data:image/jpeg;base64,test123',
      onloadend: null,
      onerror: null,
    };

    jest
      .spyOn(window, 'FileReader')
      .mockImplementation(() => mockFileReader as FileReader);

    await act(async () => {
      fireEvent.change(input, { target: { files: [validFile] } });
      mockFileReader.onloadend?.();
    });

    await waitFor(() => {
      expect(screen.getByAltText('Preview')).toBeInTheDocument();
    });
  });

  it('handles image removal', async () => {
    const onChangeMock = jest.fn();

    wrapper(
      <ImageUpload
        value="data:image/jpeg;base64,test123"
        onChange={onChangeMock}
      />,
    );

    const removeButton = screen.getByText('Remove Image');

    await act(async () => {
      fireEvent.click(removeButton);
    });

    expect(onChangeMock).toHaveBeenCalledWith('');

    await waitFor(() => {
      expect(screen.queryByAltText('Preview')).not.toBeInTheDocument();
    });
  });

  it('disables interaction when isDisabled prop is true', () => {
    wrapper(<ImageUpload isDisabled={true} />);

    const selectButton = screen.getByText('Select Image');

    expect(selectButton).toBeDisabled();
  });

  it('handles file reader error', async () => {
    wrapper(<ImageUpload />);

    const input = screen.getByTestId('image-upload-input');
    const validFile = createFile('test.jpg', 1024, 'image/jpeg');

    const mockFileReader: MockFileReader = {
      readAsDataURL: jest.fn(),
      onloadend: null,
      onerror: null,
    };

    jest
      .spyOn(window, 'FileReader')
      .mockImplementation(() => mockFileReader as FileReader);

    await act(async () => {
      fireEvent.change(input, { target: { files: [validFile] } });
      mockFileReader.onerror?.();
    });

    await waitFor(() => {
      expect(mockAddToast).toHaveBeenCalledWith(
        BOOK_MESSAGES.READ_FILE_FAILED,
        'error',
      );
    });
  });
});
