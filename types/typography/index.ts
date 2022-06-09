import fontSizeType from './font-size';
import fontWeightType from './font-weight';
import lineHeightType from './line-height';

interface TypographyType {
  fontWeight?: fontWeightType;
  fontSize?: fontSizeType;
  lineHeight?: lineHeightType;
  letterSpacing?: { [key: string]: number };
}

export default TypographyType;
