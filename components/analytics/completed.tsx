import { BorderRadius } from "@/constants";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../common/ThemedText";

export const Completed = () => {
  return (
    <View style={styles.container}>
      
      <View>
        
      </View>
      <View>
        <ThemedText font="bold" size="small" style={styles.title}>
          Completed
        </ThemedText>
        <ThemedText size="extraSmall" style={styles.description}>
          Jobs Current Week
        </ThemedText>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "teal",
    width: "48%",
    borderRadius: BorderRadius.MEDIUM,
  },
  title: {
    textAlign: "center",
  },
  description: {
    textAlign: "center",
  },
});
