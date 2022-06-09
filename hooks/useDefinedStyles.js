import { useContext } from 'react';
import { DefinedSystemContext } from '../contexts/DefinedSystem';
import getStyleSheet from '../modules/getStyleSheet';

const useDefinedStyles = ({ props, skip, definedStyles }) => {
  const { theme, themeName, system } = useContext(DefinedSystemContext);

  if (skip) return undefined;

  if (!definedStyles) return [];

  const styleSheets = definedStyles?.map((definedStyle, index) =>
    getStyleSheet({
      props,
      theme,
      system,
      themeName,
      definedStyle,
      index
    })
  );

  return styleSheets;
};

export default useDefinedStyles;
