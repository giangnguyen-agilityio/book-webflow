import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

import {
  borderWidth,
  colors,
  fontSize,
  height,
  screens,
  spacing,
  width,
  container,
} from './src/themes';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      container,
      fontFamily: {
        inter: ['var(--font-inter)'],
        cardo: ['var(--font-cardo)'],
      },
      fontSize,
      borderWidth,
      screens,
      spacing,
      width,
      height,
      backgroundImage: {
        'not-found-bg': 'url(/images/background-image.webp)',
      },
    },
  },

  darkMode: 'class',
  plugins: [
    nextui({
      addCommonColors: true,
      defaultTheme: 'light',
      defaultExtendTheme: 'light',
      themes: {
        light: {
          colors,
        },
      },
    }),
  ],
};

export default config;
