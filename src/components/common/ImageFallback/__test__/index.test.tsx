// Utils
import { wrapper, act, ignoredConsoleError } from '@/utils/testUtils';

// Constants
import { IMAGE_FALLBACK_SRC } from '@/constants';

// Components
import ImageFallback from '..';

describe('ImageFallback component', () => {
  const mockSrc = '/test-image.jpg';
  const mockAlt = 'Test Image';

  beforeEach(() => {
    jest.clearAllMocks();
    ignoredConsoleError();
  });

  it('should render correctly', () => {
    const { container } = wrapper(
      <ImageFallback alt={mockAlt} height={100} src={mockSrc} width={100} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should use fallback image when error occurs', async () => {
    const { container } = wrapper(
      <ImageFallback
        alt={mockAlt}
        height={100}
        src="/invalid-image.jpg"
        width={100}
      />,
    );

    const image = container.querySelector('img');

    await act(async () => {
      image?.dispatchEvent(new Event('error'));
    });

    expect(image?.getAttribute('src')).toContain(
      encodeURIComponent(IMAGE_FALLBACK_SRC.DEFAULT.src),
    );
  });
});
