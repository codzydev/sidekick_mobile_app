import { Agenda, Calendar } from "@/components";
import { Padding } from "@/constants/Spacing";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";

type Props = {};

const calendar = ({}: Props) => {
  const backgroundColor = useThemeColor({}, "background");
  const calendarWidth = Dimensions.get("window").width - Padding.MEDIUM * 2;
  return (
    <>
      <SafeAreaView style={{ backgroundColor }} />
      <View style={{ backgroundColor, alignItems: "center" }}>
        <Calendar width={calendarWidth} />
      </View>
      <Agenda />
    </>
  );
};

const styles = StyleSheet.create({});

export default calendar;
