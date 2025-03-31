import { Completed, ThemedText } from "@/components";
import { WeeklyBarChart } from "@/components/barChart/weekbarChart";
import { getDaysInMonthSplitByWeek, getTodayIndex } from "@/helpers";

import { TabScreenLayout } from "@/layout";
import { DateTime } from "luxon";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

const HomeScreen = () => {
  // return <Redirect href="/task" />;
  const today = DateTime.now().startOf("day");
  // 👇 month is 1-based, but JS Date expects 0-based, so pass DateTime.now().month
  const xxx = getDaysInMonthSplitByWeek(today.month, today.year, true);
  const dataWithValues = xxx.map((week) =>
    week.map((day): { day: Date; value: number } => ({
      day: day.date.toJSDate(),
      value: Math.random(), // 0 to 1
    }))
  );
  const [activeWeekIndex, setActiveWeekIndex] = useState(getTodayIndex(xxx));

  return (
    <TabScreenLayout>
      <ThemedText size="large" font="bold">
        Hello John Smith
      </ThemedText>
      <ThemedText size="small">Welcome Back !</ThemedText>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Completed />
        <Completed />
      </View>

      <View>
        <WeeklyBarChart
          weeks={dataWithValues}
          activeWeekIndex={activeWeekIndex}
          onWeekChange={setActiveWeekIndex}
        />
      </View>
    </TabScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default HomeScreen;
