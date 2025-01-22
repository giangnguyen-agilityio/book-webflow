import { Navbar } from '@heroui/react';

// Utils
import { wrapper } from '@/utils/testUtils';

// Components
import Sidebar from '..';

jest.mock('@heroui/react', () => ({
  ...jest.requireActual('@heroui/react'),
  useNavbarContext: () => ({
    setIsMenuOpen: jest.fn(),
    isMenuOpen: true,
  }),
}));

describe('Sidebar component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithNavbar = (children: React.ReactNode) => {
    return wrapper(<Navbar>{children}</Navbar>);
  };

  it('should render correctly', () => {
    const { container } = renderWithNavbar(<Sidebar />);

    expect(container).toMatchSnapshot();
  });
});
