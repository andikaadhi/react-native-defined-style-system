import spacing from '../style-systems/spacing';
import sizing from '../style-systems/sizing';
import shadow from '../style-systems/shadow';
import { SystemsType } from '../types/styles-system';
import createStyleSheetModule from './createStyleSheetModule';

// eslint-disable-next-line default-param-last
const createSystem = (name: string, value: object = {}, isUseTheme?: boolean) => ({
  name,
  value,
  isUseTheme
});

const defineSystem = (systems: SystemsType) => {
  const system = {
    p: createSystem('padding', spacing),
    pl: createSystem('paddingLeft', spacing),
    pr: createSystem('paddingRight', spacing),
    pt: createSystem('paddingTop', spacing),
    pb: createSystem('paddingBottom', spacing),
    px: createSystem('paddingHorizontal', spacing),
    py: createSystem('paddingVertical', spacing),
    m: createSystem('margin', spacing),
    ml: createSystem('marginLeft', spacing),
    mr: createSystem('marginRight', spacing),
    mt: createSystem('marginTop', spacing),
    mb: createSystem('marginBottom', spacing),
    mx: createSystem('marginHorizontal', spacing),
    my: createSystem('marginVertical', spacing),
    width: createSystem('width', sizing),
    w: createSystem('width', sizing),
    height: createSystem('height', sizing),
    h: createSystem('height', sizing),
    bg: createSystem('backgroundColor', null, true),
    color: createSystem('color', null, true),
    borderColor: createSystem('borderColor', null, true),
    borderTopColor: createSystem('borderTopColor', null, true),
    borderBottomColor: createSystem('borderBottomColor', null, true),
    borderEndColor: createSystem('borderEndColor', null, true),
    borderLeftColor: createSystem('borderLeftColor', null, true),
    borderRightColor: createSystem('borderRightColor', null, true),
    borderStartColor: createSystem('borderStartColor', null, true),
    borderRadius: createSystem('borderRadius', systems?.borderRadius),
    borderTopEndRadius: createSystem('borderTopEndRadius', systems?.borderRadius),
    borderTopLeftRadius: createSystem('borderTopLeftRadius', systems?.borderRadius),
    borderTopRightRadius: createSystem('borderTopRightRadius', systems?.borderRadius),
    borderTopStartRadius: createSystem('borderTopStartRadius', systems?.borderRadius),
    borderBottomEndRadius: createSystem('borderBottomEndRadius', systems?.borderRadius),
    borderBottomLeftRadius: createSystem('borderBottomLeftRadius', systems?.borderRadius),
    borderBottomRightRadius: createSystem('borderBottomRightRadius', systems?.borderRadius),
    borderBottomStartRadius: createSystem('borderBottomStartRadius', systems?.borderRadius),
    fontSize: createSystem('fontSize', systems?.fontSize),
    fontWeight: createSystem('fontWeight', systems?.fontWeight),
    lineHeight: createSystem('lineHeight', systems?.lineHeight),
    letterSpacing: createSystem('letterSpacing', systems?.letterSpacing),
    shadow: createSystem('shadow', systems?.shadow || shadow)
  };

  return {
    system,
    createStyleSheet: createStyleSheetModule(system)
  };
};

export default defineSystem;
