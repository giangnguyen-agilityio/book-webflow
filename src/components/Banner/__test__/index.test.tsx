// Utils
import { render, screen } from '@/utils/testUtils';
import { formatMetadataTitle } from '@/utils';

// Components
import Banner from '..';

jest.mock('@/utils', () => ({
  ...jest.requireActual('@/utils'),
  formatMetadataTitle: jest.fn((title) => `Formatted ${title}`),
}));

describe('Banner component', () => {
  it('should display formatted title and description when both props are provided', () => {
    render(
      <Banner
        metadataDescription="Test Description"
        metadataTitle="Test Title"
      />,
    );

    // Verify the title is formatted and displayed correctly
    const heading = screen.getByRole('heading');
    expect(heading).toHaveTextContent('Formatted Test Title');

    // Verify the description is present
    const description = screen.getByText('Test Description');
    expect(description).toBeInTheDocument();

    // Verify the formatting utility was called with correct parameters
    expect(formatMetadataTitle).toHaveBeenCalledWith('Test Title');
  });

  it('should display only formatted title when description is omitted', () => {
    render(<Banner metadataTitle="Test Title" />);

    // Verify the title is present
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();

    // Verify the description is not rendered
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument();
  });
});
