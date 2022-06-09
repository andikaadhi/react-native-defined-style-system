import { StyleSheet } from 'react-native';
import createStyle from '../helpers/createStyle';

type CreateStyleSheetModuleReturnType = (definedStyles: { [key: string]: any }) => {
  [key: string]: any;
};

const createStyleSheetModule =
  (system): CreateStyleSheetModuleReturnType =>
  (definedStyles) => {
    const styleSheets = {};

    Object.keys(definedStyles).forEach((styleName) => {
      styleSheets[styleName] = createStyle({}, system, definedStyles[styleName]);
    });

    return StyleSheet.create(styleSheets);
  };

export default createStyleSheetModule;
