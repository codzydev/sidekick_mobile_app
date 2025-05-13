type Size = "extraSmall" | "small" | "medium" | "large" | "extraLarge";

type FontSizeMap = {
  [key in Size]: number;
};

const fontSize: FontSizeMap = {
  extraSmall: 10,
  small: 12,
  medium: 14,
  large: 18,
  extraLarge: 24,
};

export const FontSize = {
  ...fontSize,
};
