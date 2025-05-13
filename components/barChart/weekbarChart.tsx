import { DateTime } from "luxon";
import { useEffect, useRef } from "react";
import {
  ScrollView,
  ScrollView as ScrollViewType,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { ThemedText } from "../common/ThemedText";
import { Day, SingleBarChart } from "./singleBar";

type Week = Day[];

type WeeklyBarChartProps = {
  weeks: Week[];
  activeWeekIndex: number;
  onWeekChange: (index: number) => void;
};

export const WeeklyBarChart = ({
  weeks,
  activeWeekIndex,
  onWeekChange,
}: WeeklyBarChartProps) => {
  const { width: windowWidth } = useWindowDimensions();
  const scrollViewRef = useRef<ScrollViewType>(null);

  const BAR_CHART_WIDTH = windowWidth * 0.35;
  const GAP = 10; // ❌ no gap between bars
  const MAX_BAR_HEIGHT = 70;
  const LABEL_HEIGHT = 60;

  const activeWeek = weeks[activeWeekIndex] ?? [];
  const barWidth =
    (BAR_CHART_WIDTH - GAP * (activeWeek.length - 1)) / activeWeek.length;

  useEffect(() => {
    scrollViewRef.current?.scrollTo({
      x: activeWeekIndex * BAR_CHART_WIDTH,
      animated: false,
    });
  }, [activeWeekIndex]);

  return (
    <View
      style={{
        height: MAX_BAR_HEIGHT + LABEL_HEIGHT, // +10 to account for marginTop
        width: BAR_CHART_WIDTH,
        justifyContent: "flex-end",
      }}
    >
      {/* Bar Chart */}
      <View style={[styles.barRow, { gap: GAP }]}>
        {activeWeek.map((day, index) => (
          <SingleBarChart
            key={index}
            maxHeight={MAX_BAR_HEIGHT}
            width={barWidth}
            day={day}
          />
        ))}
      </View>

      {/* Week Labels */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        bounces={false}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={({ nativeEvent }) => {
          const scrollOffset = Math.max(0, nativeEvent.contentOffset.x); // prevent bounce misindex
          const newIndex = Math.round(scrollOffset / BAR_CHART_WIDTH);
          onWeekChange(newIndex);
        }}
        style={{
          width: BAR_CHART_WIDTH,
        }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {weeks.map((week, index) => {
          const today = DateTime.now().startOf("day");

          const weekStart = DateTime.fromJSDate(week[0]?.day).startOf("day");
          const weekEnd = DateTime.fromJSDate(week[6]?.day).startOf("day");

          const currentWeekStart = today.minus({ days: today.weekday - 1 }); // Monday
          const lastWeekStart = currentWeekStart.minus({ days: 7 });
          const nextWeekStart = currentWeekStart.plus({ days: 7 });

          const isSameWeek = (a: DateTime, b: DateTime) =>
            a.hasSame(b, "week") && a.year === b.year;

          const label = isSameWeek(weekStart, currentWeekStart)
            ? "This Week"
            : isSameWeek(weekStart, lastWeekStart)
            ? "Last Week"
            : isSameWeek(weekStart, nextWeekStart)
            ? "Next Week"
            : weekStart.month === weekEnd.month
            ? `${weekStart.day} – ${weekEnd.day} ${weekStart.toFormat("MMM")}`
            : `${weekStart.day} ${weekStart.toFormat("MMM")} – ${
                weekEnd.day
              } ${weekEnd.toFormat("MMM")}`;

          return (
            <View
              key={index}
              style={{
                width: BAR_CHART_WIDTH,
                alignItems: "center",
              }}
            >
              <ThemedText size="small">{label}</ThemedText>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  barRow: {
    flexDirection: "row",
    height: "80%",
    alignItems: "flex-end",
  },
  label: {
    color: "white",
    fontSize: 14,
  },
});
