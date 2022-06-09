export const SIZE = {
  small: { px: 4, py: 2 },
  medium: { px: 5, py: 4 },
  large: { px: 5, py: 4 }
};

export const button = {
  primary: {
    default: { bg: 'primary.500', fontColor: 'dark.50' },
    hover: { bg: 'primary.500', fontColor: 'dark.50' },
    focused: {
      bg: 'primary.500',
      fontColor: 'dark.50',
      borderWidth: 2,
      borderColor: 'primary.100'
    },
    pressed: { bg: 'primary.600', fontColor: 'dark.50' },
    disabled: { bg: 'primary.800', fontColor: 'dark.50' }
  },
  secondary: {
    default: {
      bg: 'dark.fg',
      fontColor: 'dark.800',
      borderWidth: 1,
      borderColor: 'dark.bd-x'
    },
    active: {},
    disabled: {}
  }
};
