import { useContext } from 'react';
import { DefinedSystemContext } from '../contexts/DefinedSystem';
import getStyleSheets from '../modules/getStyleSheet';

const useDefinedStylesCustomInjection = ({ customInjectionStyles, skip, props }) => {
  const { theme, themeName, system } = useContext(DefinedSystemContext);

  if (skip) return undefined;

  if (!customInjectionStyles) return undefined;

  const styleProps = {};

  Object.keys(customInjectionStyles).forEach((injectionPropName) => {
    styleProps[injectionPropName] = getStyleSheets({
      props,
      definedStyle: customInjectionStyles[injectionPropName],
      theme,
      themeName,
      system
    });
  });

  return styleProps;
};

export default useDefinedStylesCustomInjection;
