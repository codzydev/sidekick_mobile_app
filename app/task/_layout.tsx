import { ThemedView } from "@/components/ThemedView";

import { layoutSpacings } from "@/constants";
import React from "react";
import { StyleSheet } from "react-native";
import TaskWrapper from ".";

const _layout = () => {
  return (
    <ThemedView style={styles.container}>
      <TaskWrapper />
    </ThemedView>
  );
};

export default _layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...layoutSpacings,
  },
  content: {
    flex: 1,
  },
});
