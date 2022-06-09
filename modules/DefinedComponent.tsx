import React, { useContext } from 'react';
import { ImageProps, ImageStyle, TextProps, TextStyle, ViewProps, ViewStyle } from 'react-native';
import { DefinedSystemContext } from '../contexts/DefinedSystem';
import useDefinedStyles from '../hooks/useDefinedStyles';
import useDefinedStylesCustomInjection from '../hooks/useDefinedStylesCustomInjection';
import { SystemsType } from '../types/styles-system';
import Storage from './Storage';

const nativeStyleSheetsDefault = [];

type SystemsConfigType = {
  injectTo?: string;
};

type DefinedStyleType = {
  [key in keyof SystemsType]?: any;
};

type DefineStyleFuncType<PropsType> = (props: PropsType) => DefinedStyleType;

type DefinedCompProps<
  CompType extends React.ComponentClass | React.FC,
  AdditionalProps
> = React.ComponentProps<CompType> &
  AdditionalProps & { children?: React.ReactNode } & {
    style?: ViewProps['style'] | TextProps['style'] | ImageProps['style'];
  };

function createStorageKey(key, themeName) {
  return `${key}_${themeName}`;
}

class DefinedComponent<CompType extends React.ComponentClass | React.FC> {
  private attrsProps;

  private staticCustomInjectionDefinedStyles;

  private dynamicCustomInjectionDefinedStyles;

  private staticDefinedStyles: DefinedStyleType[];

  private dynamicDefinedStyles;

  private nativeStyleSheets;

  private RNComp: CompType;

  private styleSheetStorage = new Storage();

  constructor(RNComp: CompType) {
    this.RNComp = RNComp;
  }

  /**
   * Set Attrs
   */
  attrs(props: React.ComponentProps<CompType>) {
    this.attrsProps = props;
    return this;
  }

  /**
   * Set Style
   */
  systems<CompPropsType>(
    definedStyle:
      | DefinedStyleType
      | DefineStyleFuncType<CompPropsType & React.ComponentProps<CompType>>,
    { injectTo }: SystemsConfigType = {}
  ) {
    if (injectTo) {
      const varName =
        typeof definedStyle === 'function'
          ? 'dynamicCustomInjectionDefinedStyles'
          : 'staticCustomInjectionDefinedStyles';

      if (this[varName]) this[varName][injectTo] = definedStyle;
      else this[varName] = { [injectTo]: definedStyle };

      return this;
    }

    const varName =
      typeof definedStyle === 'function' ? 'dynamicDefinedStyles' : 'staticDefinedStyles';

    const isAlrHaveStyles = Array.isArray(this[varName]);
    if (isAlrHaveStyles) this[varName].push(definedStyle);
    else this[varName] = [definedStyle];

    return this;
  }

  /**
   * Set Native Stylesheets
   */
  styles(nativeStyleSheet: ViewStyle | TextStyle | ImageStyle) {
    const isAlrHaveStyles = Array.isArray(this.nativeStyleSheets);

    if (isAlrHaveStyles) this.nativeStyleSheets.push(nativeStyleSheet);
    else this.nativeStyleSheets = [nativeStyleSheet];

    return this;
  }

  /**
   * Create Component
   */
  create<CompPropsType>() {
    const {
      staticDefinedStyles,
      dynamicDefinedStyles,
      staticCustomInjectionDefinedStyles,
      dynamicCustomInjectionDefinedStyles,
      nativeStyleSheets = nativeStyleSheetsDefault,
      attrsProps,
      RNComp
    } = this;

    const DefinedComp =
      staticDefinedStyles ||
      dynamicDefinedStyles ||
      staticCustomInjectionDefinedStyles ||
      dynamicCustomInjectionDefinedStyles
        ? ({ style, ...props }: DefinedCompProps<CompType, CompPropsType>, ref) => {
            const { themeName } = useContext(DefinedSystemContext);

            let skip;

            /**
             * Cacheable Static StyleSheet
             */
            const styleSheetStorageKey = createStorageKey('stylesheet', themeName);
            skip = Boolean(this.styleSheetStorage.exist(styleSheetStorageKey));

            const staticStyleSheets = useDefinedStyles({
              props,
              skip,
              definedStyles: staticDefinedStyles
            });

            if (!skip) this.styleSheetStorage.set(styleSheetStorageKey, staticStyleSheets);

            /**
             * Non-Cacheable Dynamic StyleSheet
             */
            const dynamicStyleSheetsCache = useDefinedStyles({
              props,
              skip: false,
              definedStyles: dynamicDefinedStyles
            });

            /**
             * Cacheable Custom Injection Props
             */
            const customInjectionPropsStorageKey = createStorageKey('custom_injection', themeName);
            skip = Boolean(this.styleSheetStorage.exist(customInjectionPropsStorageKey));

            const customStyleInjectionProps = useDefinedStylesCustomInjection({
              props,
              skip,
              customInjectionStyles: this.staticCustomInjectionDefinedStyles
            });

            if (!skip)
              this.styleSheetStorage.set(customInjectionPropsStorageKey, customStyleInjectionProps);

            /**
             * Non-Cacheable Custom Injection Props
             */
            const dynamicCustomInjectionStylesCache = useDefinedStylesCustomInjection({
              props,
              skip: false,
              customInjectionStyles: this.dynamicCustomInjectionDefinedStyles
            });

            const extendedStyles = Array.isArray(style) ? style : [style];

            return (
              <RNComp
                ref={ref}
                style={[
                  ...this.styleSheetStorage.get(styleSheetStorageKey),
                  ...dynamicStyleSheetsCache,
                  ...nativeStyleSheets,
                  ...extendedStyles
                ]}
                {...this.styleSheetStorage.get(customInjectionPropsStorageKey)}
                {...dynamicCustomInjectionStylesCache}
                {...attrsProps}
                {...props}
              />
            );
          }
        : ({ style, ...props }: DefinedCompProps<CompType, CompPropsType>, ref) => (
            <RNComp ref={ref} style={[...nativeStyleSheets, style]} {...attrsProps} {...props} />
          );

    return React.forwardRef<any, DefinedCompProps<CompType, CompPropsType>>(DefinedComp);
  }
}

export default DefinedComponent;
