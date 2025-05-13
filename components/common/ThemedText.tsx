import { FontSize } from "@/constants/fontSize";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Text, TextProps } from "react-native";

type Size = keyof typeof FontSize;
type FontWeight = "regular" | "medium" | "semiBold" | "bold";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  size?: Size;
  font?: FontWeight;
  numberOfLines?: number;
  children: React.ReactNode;
};

export function ThemedText(props: ThemedTextProps) {
  const {
    style,
    lightColor,
    darkColor,
    size = "medium",
    font = "regular",
    numberOfLines,
    children,
    ellipsizeMode,
  } = props;

  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "primaryText"
  );

  const fontSize = FontSize[size];
  const fontFamily = {
    regular: "Poppins_400Regular",
    medium: "Poppins_500Medium",
    semiBold: "Poppins_600SemiBold",
    bold: "Poppins_700Bold",
  }[font];

  return (
    <Text
      style={[
        {
          color: color,
          fontSize: fontSize,
          fontFamily: fontFamily,
          lineHeight: Math.round(fontSize * 1.5),
        },
        style,
      ]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
    >
      {children}
    </Text>
  );
}
