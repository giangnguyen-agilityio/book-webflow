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
    200: '#969aa0', // Spanish Gray
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
  text: {
    default: colorPalette.white[100],
    primary: colorPalette.blue[200],
    secondary: colorPalette.gray[200],
    tertiary: colorPalette.yellow[100],
    disabled: colorPalette.gray[150],
    link: colorPalette.blue[150],
    linkHover: colorPalette.yellow[100],
    success: colorPalette.green[150],
    error: colorPalette.red[100],
  },

  background: {
    default: colorPalette.white[100],
    primary: colorPalette.blue[200],
    secondary: colorPalette.white[150],
    tertiary: colorPalette.yellow[100],
    disabled: colorPalette.gray[100],
  },

  border: {
    default: colorPalette.yellow[100],
    primary: colorPalette.blue[100],
    secondary: colorPalette.blue[200],
  },
};

export { colorPalette, colors };
