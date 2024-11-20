import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

import { colorPalette, colors } from '@/themes';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ...colorPalette,
        ...colors,
      },
    },
  },
  plugins: [nextui()],
};

export default config;
