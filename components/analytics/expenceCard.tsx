import { BorderRadius, Padding } from "@/constants";
import React from "react";
import { StyleSheet } from "react-native";
import { CardView } from "../common/CardView";
import { ThemedText } from "../common/ThemedText";

type Props = {};

export const ExpenceCard = ({}: Props) => {
  return (
    <CardView style={styles.conatainer}>
      <ThemedText>expenceCard</ThemedText>
    </CardView>
  );
};

const styles = StyleSheet.create({
  conatainer: {
    borderRadius: BorderRadius.MEDIUM,
    borderCurve: "continuous",
    padding: Padding.SMALL,
    paddingVertical: 30,
    width: "100%",
  },
});
