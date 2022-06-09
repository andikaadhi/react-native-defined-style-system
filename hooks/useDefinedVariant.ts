import { useRef, useContext } from 'react';
import { DefinedSystemContext } from '../contexts/DefinedSystem';
import createStyle from '../helpers/createStyle';

interface VariantsTypes {
  [variant: string]: { [key: string]: any };
}

interface VariantsWithStateTypes {
  [state: string]: VariantsTypes;
}

interface ParamsTypes {
  variant: string;
  variants: VariantsTypes | VariantsWithStateTypes;
  state?: string;
  withState?: boolean;
  compId: string | number;
}

const VariantStylesSheets = {};

const createCompKey = (compId, variant, state, themeName) =>
  `${compId}_${variant}_${state}-${themeName}`;

const useDefinedVariant = ({ variant, state, variants, withState, compId }: ParamsTypes) => {
  const { theme, themeName, system } = useContext(DefinedSystemContext);
  const currentTheme = useRef(theme);

  const hasThemeChanged = currentTheme.current !== theme;

  if (hasThemeChanged) currentTheme.current = theme;

  const isStyleAlrExist = VariantStylesSheets[createCompKey(compId, variant, state, themeName)];

  if (hasThemeChanged || !isStyleAlrExist) {
    const definedStyles = withState ? variants[variant][state] : variants[variant];

    VariantStylesSheets[createCompKey(compId, variant, state, themeName)] = createStyle(
      theme,
      system,
      definedStyles
    );
  }

  return { style: VariantStylesSheets[createCompKey(compId, variant, state, themeName)], theme };
};
export default useDefinedVariant;
