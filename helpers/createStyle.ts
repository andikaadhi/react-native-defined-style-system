import { SystemsType } from '../types/styles-system';
import themeTypes from '../types/theme';
import getColor from './getColor';

interface styleTypes {
  isUseTheme?: boolean;
  name: string;
  value: { [key: string]: { [key: string]: string | number } };
}

const createStyle = (currentTheme: themeTypes, system: SystemsType, definedStyle: object) => {
  let styles = {};

  if (!definedStyle) return styles;

  Object.keys(definedStyle).forEach((key) => {
    const style: styleTypes = system[key];

    if (!style) {
      styles[key] = definedStyle[key];
      return;
    }

    if (style.isUseTheme) {
      styles[style.name] = getColor(currentTheme, definedStyle[key]);
      return;
    }

    if (style.name === 'shadow') {
      styles = { ...styles, ...style.value[definedStyle[key]] };
      return;
    }

    styles[style.name] = style.value[definedStyle[key]] || definedStyle[key];
  });

  return styles;
};

export default createStyle;
