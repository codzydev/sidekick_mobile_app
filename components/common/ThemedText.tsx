import { StyleSheet, Text, type TextProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
  colorPallete?: "primaryText" | "secondaryText" | "tertiaryText";
  numberOfLines?: number;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  numberOfLines,
  colorPallete,

  ...rest
}: ThemedTextProps) {
  const pallet = colorPallete ?? "primaryText";
  const color = useThemeColor({ light: lightColor, dark: darkColor }, pallet);

  return (
    <Text
      numberOfLines={numberOfLines ?? undefined}
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}
const styles = StyleSheet.create({
  default: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    lineHeight: 24,
  },
  subtitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
  },
  link: {
    fontFamily: "Poppins_500Medium",
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
