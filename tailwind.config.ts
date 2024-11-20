import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

import { colorPalette, colors, fontSize } from '@/themes';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)'],
        cardo: ['var(--font-cardo)'],
      },
      fontSize,
      colors: {
        ...colorPalette,
        ...colors,
      },
    },
  },
  plugins: [nextui()],
};

export default config;
