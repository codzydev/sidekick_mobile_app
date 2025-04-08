import { ThemedView } from "@/components";
import { GAP, layoutSpacings } from "@/constants";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { ReactNode } from "react";
import { ScrollView, StyleSheet } from "react-native";

type Props = {
  children: ReactNode;
};

export const TabScreenLayout = ({ children }: Props) => {
  const backgroundColor = useThemeColor({}, "background");
  return (
    <ScrollView style={[styles.content, { backgroundColor }]}>
      <ThemedView style={styles.content}>{children}</ThemedView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    ...layoutSpacings,
    gap: GAP,
  },
});
