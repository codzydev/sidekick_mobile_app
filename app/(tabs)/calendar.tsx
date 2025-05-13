import { Agenda, Calendar } from "@/components";
import Seperator from "@/components/common/Seperator";
import { ThemedView } from "@/components/common/ThemedView";
import { Margin, Padding } from "@/constants/spacing";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {};

const calendar = ({ }: Props) => {
  const calendarWidth = Dimensions.get("window").width - Margin.SMALL * 2;
  return (
    <ThemedView style={{ gap: Padding.LARGE }}>
      <SafeAreaView />
      <Calendar width={calendarWidth} style={{ alignSelf: "center" }} />
      <Seperator />
      <Agenda />
    </ThemedView>
  );
};

const styles = StyleSheet.create({});

export default calendar;
