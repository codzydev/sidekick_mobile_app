import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";

const Seperator = () => {
  const isDark = useColorScheme() === "dark";
  const borderColor = isDark ? Colors.dark.text : Colors.light.text;
  return <View style={[styles.container, { borderColor }]} />;
};

export default Seperator;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    flex: 1,
  },
});
