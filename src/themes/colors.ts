import { ThemeColors } from '@nextui-org/react';

const colorPalette = {
  white: {
    100: '#ffffff', // White
    150: '#f6f8fc', // Ghost White
  },
  blue: {
    100: '#e8e8e8', // Platinum
    150: '#b4c7e7', // Light Steel Blue
    200: '#1b3764', // Indigo
  },
  yellow: {
    100: '#ffca42', // Sunglow
  },
  gray: {
    100: '#d9d9d9', // Light Silver
    150: '#a1a1a1', // Quick Silver
    200: '#727780', // AuroMetalSaurus
  },
  green: {
    100: '#c1dcdc', // Columbia Blue
    150: '#0a8570', // Light Green Turquoise
  },
  red: {
    100: '#e60000', // Coral Pink
  },
};

const colors = {
  // Base colors
  background: {
    DEFAULT: colorPalette.white[100],
    50: colorPalette.white[100], // default background
    100: colorPalette.white[150], // primary background
    200: colorPalette.blue[200], // secondary background
    300: colorPalette.yellow[100], // tertiary background
    400: colorPalette.gray[100], // quaternary background
    500: colorPalette.blue[100], // disabled background
  },
  foreground: {
    DEFAULT: colorPalette.white[100],
    50: colorPalette.white[100], // text-default
    100: colorPalette.blue[200], // text-primary
    200: colorPalette.gray[200], // text-secondary
    300: colorPalette.yellow[100], // text-tertiary
    400: colorPalette.gray[150], // text-disabled
    500: colorPalette.blue[150], // text-link
    600: colorPalette.yellow[100], // text-linkHover
    700: colorPalette.green[150], // text-success
    800: colorPalette.red[100], // text-error
  },

  // Semantic colors
  primary: {
    DEFAULT: colorPalette.blue[200],
    foreground: colorPalette.white[100],
  },
  secondary: {
    DEFAULT: colorPalette.yellow[100],
    foreground: colorPalette.blue[200],
  },
  success: {
    DEFAULT: colorPalette.green[150],
    foreground: colorPalette.white[100],
  },
  danger: {
    DEFAULT: colorPalette.red[100],
    foreground: colorPalette.white[100],
  },
} as ThemeColors;

export { colorPalette, colors };
