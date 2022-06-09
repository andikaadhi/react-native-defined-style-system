type layoutKey = 'width' | 'w' | 'height' | 'h';

type layoutType = {
  [key in layoutKey]?: number | string;
};

export default layoutType;
