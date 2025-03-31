import { BorderRadius } from "@/constants";
import { getDaysInMonthSplitByWeek, getTodayIndex } from "@/helpers";
import { DateTime } from "luxon";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { WeeklyBarChart } from "../barChart/weekbarChart";
import { ThemedText } from "../common/ThemedText";

export const CompletedBar = () => {
  const today = DateTime.now().startOf("day");
  // 👇 month is 1-based, but JS Date expects 0-based, so pass DateTime.now().month
  const weeks = getDaysInMonthSplitByWeek(today.month, today.year, true);
  const dataWithValues = weeks.map((week) =>
    week.map((day): { day: Date; value: number } => ({
      day: day.date.toJSDate(),
      value: Math.random(), // 0 to 1
    }))
  );
  const [activeWeekIndex, setActiveWeekIndex] = useState(getTodayIndex(weeks));

  return (
    <View style={styles.container}>
      <View>
        <ThemedText font="bold" size="small" style={styles.title}>
          Completed
        </ThemedText>
        <ThemedText size="extraSmall" style={styles.description}>
          Jobs Current Week
        </ThemedText>
      </View>
      <WeeklyBarChart
        weeks={dataWithValues}
        activeWeekIndex={activeWeekIndex}
        onWeekChange={setActiveWeekIndex}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "teal",
    borderRadius: BorderRadius.MEDIUM,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  title: {
    textAlign: "center",
  },
  description: {
    textAlign: "center",
  },
});
