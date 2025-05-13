import { ThemedView } from "@/components/common/ThemedView";

import { layoutSpacings } from "@/constants";
import React from "react";
import { StyleSheet } from "react-native";
import TaskWrapper from ".";
import { SafeAreaView } from "react-native-safe-area-context";

const _layout = () => {
  return (
    <>
      <SafeAreaView />
      <ThemedView style={styles.container}>
        <TaskWrapper />
      </ThemedView></>
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
