import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";

export const CardView = ({ style, ...otherProps }: ViewProps) => {
  const backgroundColor = useThemeColor({}, "card");
  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
};

const styles = StyleSheet.create({});
