import { ReactNode } from 'react';
import { render } from '@testing-library/react';

// Providers
import Providers from '@/app/providers';

export const wrapper = (children: ReactNode) => {
  return render(<Providers>{children}</Providers>);
};

export const ignoredConsoleError = () => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
};

export * from '@testing-library/react';
export * from '@testing-library/user-event';
