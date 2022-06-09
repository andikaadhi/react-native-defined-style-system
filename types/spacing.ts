type spacingKey =
  | 'p'
  | 'pl'
  | 'pr'
  | 'pt'
  | 'pb'
  | 'px'
  | 'py'
  | 'm'
  | 'ml'
  | 'mr'
  | 'mt'
  | 'mb'
  | 'mx'
  | 'my';

type spacingType = {
  [key in spacingKey]?: number;
};

export default spacingType;
