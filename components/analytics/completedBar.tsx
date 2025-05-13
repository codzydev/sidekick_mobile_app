import { BorderRadius, Padding } from "@/constants";
import { getShortWeeks, getTodayIndex } from "@/helpers";
import { DateTime } from "luxon";
import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { WeeklyBarChart } from "../barChart/weekbarChart";
import { CardView } from "../common/CardView";
import { ThemedText } from "../common/ThemedText";

export const CompletedBar = () => {
  const today = DateTime.now().startOf("day");
  // 👇 month is 1-based, but JS Date expects 0-based, so pass DateTime.now().month
  const weeks = getShortWeeks();

  const dataWithValues = weeks.map((week) =>
    week.map((day): { day: Date; value: number } => ({
      day: day.date.toJSDate(),
      value: Math.random(), // 0 to 1
    }))
  );

  const [activeWeekIndex, setActiveWeekIndex] = useState(getTodayIndex(weeks));

  const week = useMemo(() => {
    switch (activeWeekIndex) {
      case 0:
        return "Last Week";
      case 1:
        return "Current Week";
      default:
        return "";
    }
  }, [activeWeekIndex]);

  return (
    <CardView style={styles.container}>
      <View>
        <ThemedText font="bold" size="small" style={styles.title}>
          Completed
        </ThemedText>
        <ThemedText size="extraSmall" style={styles.description}>
          {`Jobs ${week}`}
        </ThemedText>
      </View>
      <WeeklyBarChart
        weeks={dataWithValues}
        activeWeekIndex={activeWeekIndex}
        onWeekChange={setActiveWeekIndex}
      />
    </CardView>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.MEDIUM,
    borderCurve: "continuous",
    padding: Padding.SMALL,
    width: "48%",
    // height: 180,
  },
  title: {
    textAlign: "left",
  },
  description: {
    textAlign: "left",
  },
});
