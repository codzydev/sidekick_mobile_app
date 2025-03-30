import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, View } from "react-native";

const Seperator = () => {
  const borderColor = useThemeColor({}, "shadow");
  return <View style={[styles.container, { borderColor }]} />;
};

export default Seperator;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 2,
    flex: 1,
  },
});
