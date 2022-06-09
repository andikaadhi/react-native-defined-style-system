const spacing = {};

[...Array(21).keys()].forEach((id) => {
  spacing[id] = id * 4;
});

export default spacing;
