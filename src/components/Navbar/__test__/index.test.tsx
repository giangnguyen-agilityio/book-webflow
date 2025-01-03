import { Navbar as NextUINavbar } from '@nextui-org/react';

// Utils
import { screen, wrapper } from '@/utils/testUtils';

// Constants
import { NAVIGATION_ITEMS } from '@/constants';

// Components
import Navbar from '..';

jest.mock('@nextui-org/react', () => ({
  ...jest.requireActual('@nextui-org/react'),
  useNavbarContext: () => ({
    setIsMenuOpen: jest.fn(),
    isMenuOpen: true,
  }),
}));

describe('Navbar component', () => {
  const renderWithNavbar = (children: React.ReactNode) => {
    return wrapper(<NextUINavbar>{children}</NextUINavbar>);
  };

  it('should render correctly', () => {
    const { container } = renderWithNavbar(<Navbar pathname="/" />);

    expect(container).toMatchSnapshot();
  });

  it('should render all navigation items', () => {
    renderWithNavbar(<Navbar pathname="/" />);

    NAVIGATION_ITEMS.MAIN.forEach(({ label, url, title }) => {
      const link = screen.getByText(label);

      expect(link.closest('a')).toHaveAttribute('href', url);
      expect(link.closest('a')).toHaveAttribute('title', title);
    });
  });

  it('should highlight active item when pathname matches exactly', () => {
    const activeUrl = NAVIGATION_ITEMS.MAIN[0].url;

    renderWithNavbar(<Navbar pathname={activeUrl} />);

    const activeLink = screen.getByText(NAVIGATION_ITEMS.MAIN[0].label);

    expect(activeLink).toHaveClass('text-secondary', 'underline');
  });

  it('should highlight active item when pathname includes label', () => {
    const activeLabel = NAVIGATION_ITEMS.MAIN[0].label.toLowerCase();
    renderWithNavbar(<Navbar pathname={`/some/${activeLabel}/path`} />);

    const activeLink = screen.getByText(NAVIGATION_ITEMS.MAIN[0].label);

    expect(activeLink).toHaveClass('text-secondary', 'underline');
  });
});
