import { DateTime } from "luxon";
import { useEffect, useRef } from "react";
import {
    ScrollView,
    ScrollView as ScrollViewType,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
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
        // justifyContent: "flex-end",
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
          height: LABEL_HEIGHT,
          marginTop: 10, // ✅ added margin top here
        }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {weeks.map((week, index) => {
          const start = DateTime.fromJSDate(week[0]?.day).startOf("day");
          const end = DateTime.fromJSDate(week[6]?.day).startOf("day");

          const today = DateTime.now().startOf("day");
          const currentWeekStart = today.minus({ days: today.weekday - 1 }); // force to Monday
          const currentWeekEnd = currentWeekStart.plus({ days: 6 });

          const isThisWeek =
            start.hasSame(currentWeekStart, "day") &&
            end.hasSame(currentWeekEnd, "day");

          console.log(
            `today: ${today} currentWeekStart: ${currentWeekStart} currentWeekEnd: ${currentWeekEnd} isThisWeek: ${isThisWeek}`
          );

          const label = isThisWeek
            ? "This Week"
            : start.month === end.month
            ? `${start.day} – ${end.day} ${start.toFormat("MMM")}`
            : `${start.day} ${start.toFormat("MMM")} – ${
                end.day
              } ${end.toFormat("MMM")}`;

          return (
            <View
              key={index}
              style={{
                width: BAR_CHART_WIDTH,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.label}>{label}</Text>
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
    height: "75%",
    alignItems: "flex-end",
  },
  label: {
    color: "white",
    fontSize: 14,
    fontFamily: "FiraCode-Regular",
  },
});
