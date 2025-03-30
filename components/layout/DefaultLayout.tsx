import { Padding } from "@/constants/spacing";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { ReactNode } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { ThemedView } from "../ThemedView";

type Props = {
  children: ReactNode;
};

export const DefaultLayout = ({ children }: Props) => {
  const backgroundColor = useThemeColor({}, "background");
  return (
    <ScrollView
      style={[styles.content, { backgroundColor }]}
      nestedScrollEnabled
    >
      <SafeAreaView />
      <ThemedView style={styles.content}>{children}</ThemedView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: Padding.MEDIUM,
  },
});
