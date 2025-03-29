import { Calendar } from "@/components";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

type Props = {};

const calendar = ({}: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView />
      <Calendar />
    </View>
  );
};

const styles = StyleSheet.create({
  // conatainer: tailwind``,
});

export default calendar;
