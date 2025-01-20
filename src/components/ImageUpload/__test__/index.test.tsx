// Utils
import { screen, wrapper, userEvent } from '@/utils/testUtils';

// Constants
import {
  BOOK_MESSAGES,
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
} from '@/constants';

// Context
import { useToast } from '@/context';

import ImageUpload from '..';

jest.mock('@/context', () => ({
  ...jest.requireActual('@/context'),
  useToast: jest.fn(() => ({
    addToast: jest.fn(),
  })),
}));

describe('ImageUpload component', () => {
  const mockAddToast = jest.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
    (useToast as jest.Mock).mockReturnValue({
      addToast: mockAddToast,
    });
  });

  it('should render upload button when no image is selected', () => {
    wrapper(<ImageUpload />);

    expect(screen.getByText('Select Image')).toBeInTheDocument();
  });

  it('should render image preview when value prop is provided', () => {
    const imageUrl = 'data:image/jpeg;base64,test123';

    wrapper(<ImageUpload value={imageUrl} />);

    expect(screen.getByAltText('Preview')).toBeInTheDocument();
  });

  it('should show remove button when image is selected', () => {
    wrapper(<ImageUpload value="data:image/jpeg;base64,test123" />);

    expect(screen.getByText('Remove Image')).toBeInTheDocument();
  });

  it('should call onChange when image is removed', async () => {
    const onChange = jest.fn();

    wrapper(
      <ImageUpload
        value="data:image/jpeg;base64,test123"
        onChange={onChange}
      />,
    );

    const removeButton = screen.getByText('Remove Image');

    await user.click(removeButton);

    expect(onChange).toHaveBeenCalledWith('');
  });

  it('should show error message when provided', () => {
    const errorMessage = 'Test error message';

    wrapper(<ImageUpload error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('should validate file size', async () => {
    wrapper(<ImageUpload />);

    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

    Object.defineProperty(file, 'size', { value: MAX_FILE_SIZE + 1 });

    const input = screen.getByTestId('image-upload-input');
    await user.upload(input, file);

    expect(mockAddToast).toHaveBeenCalledWith(
      BOOK_MESSAGES.IMAGE_SIZE_TOO_LARGE,
      'error',
    );
  });

  it('should handle file reader error', async () => {
    wrapper(<ImageUpload />);

    const file = new File(['test'], 'test.jpg', {
      type: ACCEPTED_IMAGE_TYPES[0],
    });
    const input = screen.getByTestId('image-upload-input');

    // Mock FileReader with error
    const mockFileReader = {
      readAsDataURL: jest.fn(),
      onerror: jest.fn(),
    };
    jest
      .spyOn(window, 'FileReader')
      .mockImplementation(() => mockFileReader as unknown as FileReader);

    await user.upload(input, file);
    mockFileReader.onerror?.();

    expect(mockAddToast).toHaveBeenCalledWith(
      BOOK_MESSAGES.READ_FILE_FAILED,
      'error',
    );
  });

  it('should show loading indicator when processing', async () => {
    wrapper(<ImageUpload />);

    const file = new File(['test'], 'test.jpg', {
      type: ACCEPTED_IMAGE_TYPES[0],
    });
    const input = screen.getByTestId('image-upload-input');

    await user.upload(input, file);

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  });

  it('should show accepted formats and file size limit', () => {
    wrapper(<ImageUpload />);

    expect(
      screen.getByText('Accepted formats: JPEG, PNG, WebP'),
    ).toBeInTheDocument();
    expect(screen.getByText('Maximum file size: 5MB')).toBeInTheDocument();
  });
});
