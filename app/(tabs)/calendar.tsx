import { Agenda, Calendar } from "@/components";
import Seperator from "@/components/common/Seperator";
import { Padding } from "@/constants/Spacing";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

type Props = {};

const calendar = ({}: Props) => {
  const backgroundColor = useThemeColor({}, "background");
  const calendarWidth = Dimensions.get("window").width - Padding.SMALL * 2;
  return (
    <>
      <View style={{ backgroundColor }}>
        <Calendar width={calendarWidth} style={{ alignSelf: "center" }} />
      </View>
      <Seperator />
      <Agenda />
    </>
  );
};

const styles = StyleSheet.create({});

export default calendar;
