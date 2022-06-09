import createStyle from '../helpers/createStyle';

const getStyleSheet = ({ props, definedStyle, theme, system }) => {
  // handle dynamic style with function
  if (typeof definedStyle === 'function') return createStyle(theme, system, definedStyle(props));

  return createStyle(theme, system, definedStyle);
};

export default getStyleSheet;
