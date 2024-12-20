// Utils
import { screen, wrapper } from '@/utils/testUtils';

// Constants
import { NAVIGATION_ITEMS, ROUTES, SOCIAL_LINK_ITEMS } from '@/constants';

// Components
import Footer from '..';

describe('Footer component', () => {
  it('should render correctly', () => {
    const { container } = wrapper(<Footer />);
    expect(container).toMatchSnapshot();
  });

  it('should render all navigation sections', () => {
    wrapper(<Footer />);

    // Check section headings
    expect(screen.getByText('Explore')).toBeInTheDocument();
    expect(screen.getByText('Utility Pages')).toBeInTheDocument();
    expect(screen.getByText('Keep in Touch')).toBeInTheDocument();
  });

  it('should render all explore navigation items with correct links', () => {
    wrapper(<Footer />);

    NAVIGATION_ITEMS.EXPLORE.forEach(({ label, url }) => {
      const link = screen.getByText(label).closest('a');

      expect(link).toHaveAttribute('href', url);
    });
  });

  it('should render all utility navigation items with correct links', () => {
    wrapper(<Footer />);

    NAVIGATION_ITEMS.UTILITY.forEach(({ label, url }) => {
      const link = screen.getByText(label).closest('a');

      expect(link).toHaveAttribute('href', url);
    });
  });

  it('should render all social media links', () => {
    wrapper(<Footer />);

    SOCIAL_LINK_ITEMS.forEach(({ title, url }) => {
      const link = screen.getByTitle(title);

      expect(link).toHaveAttribute('href', url);
    });
  });

  it('should render logo with correct link', () => {
    wrapper(<Footer />);

    const logoLink = screen.getByLabelText(/Logo Icon/i)?.closest('a');

    expect(logoLink).toHaveAttribute('href', ROUTES.STORE);
  });
});
