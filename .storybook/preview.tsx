import React from 'react';
import type { Preview } from '@storybook/react';

import Providers from '../src/app/providers';
import { ToastProvider } from '../src/context/ToastContext';

import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },

  decorators: [
    (Story) => (
      <Providers>
        <ToastProvider>
          <Story />
        </ToastProvider>
      </Providers>
    ),
  ],
};

export default preview;
