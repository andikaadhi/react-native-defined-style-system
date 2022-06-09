import React, { useMemo, useState } from 'react';
import themeType from '../types/theme';

interface DefinedSystemContextType {
  theme: themeType;
  themeName: any;
  changeTheme: (themeName: any) => void;
  system: any;
}

interface DefinedSystemProviderPropsType<ThemeNameType extends string> {
  themes: { [themeName in ThemeNameType]: themeType };
  defaultTheme: ThemeNameType;
  system: any;
}

export const DefinedSystemContext = React.createContext<DefinedSystemContextType | null>(null);

export const DefinedSystemProvider = <ThemeNameType extends string>({
  themes,
  defaultTheme,
  system,
  children
}: React.PropsWithChildren<DefinedSystemProviderPropsType<ThemeNameType>>) => {
  const [themeName, setThemeName] = useState<ThemeNameType>(defaultTheme);

  const value: DefinedSystemContextType = useMemo(
    () => ({
      theme: themes[themeName],
      themeName,
      changeTheme: setThemeName,
      system
    }),
    [themes, themeName, system]
  );

  return <DefinedSystemContext.Provider value={value}>{children}</DefinedSystemContext.Provider>;
};
