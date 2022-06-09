const getColor = (theme, themeColor) => {
  const [color, level] = themeColor.split('.');
  return theme[color][level];
};

export default getColor;
