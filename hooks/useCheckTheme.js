import { useRef } from 'react';

const useCheckTheme = (theme) => {
  const currentTheme = useRef(theme);

  const hasThemeChanged = currentTheme.current !== theme;

  if (hasThemeChanged) currentTheme.current = theme;

  return hasThemeChanged;
};

export default useCheckTheme;
