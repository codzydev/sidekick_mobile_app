import { Agenda, Calendar } from "@/components";
import Seperator from "@/components/common/Seperator";
import { Margin, Padding } from "@/constants/Spacing";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

type Props = {};

const calendar = ({}: Props) => {
  const backgroundColor = useThemeColor({}, "background");
  const calendarWidth = Dimensions.get("window").width - Margin.SMALL * 2;
  return (
    <View style={{ backgroundColor, gap: Padding.LARGE }}>
      <Calendar width={calendarWidth} style={{ alignSelf: "center" }} />
      <Seperator />
      <Agenda />
    </View>
  );
};

const styles = StyleSheet.create({});

export default calendar;
