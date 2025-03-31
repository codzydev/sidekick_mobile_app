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

  const BAR_CHART_WIDTH = windowWidth * 0.8;
  const GAP = 10;
  const MAX_BAR_HEIGHT = 150;
  const LABEL_HEIGHT = 60;

  const activeWeek = weeks[activeWeekIndex] ?? [];
  const barWidth =
    (BAR_CHART_WIDTH - GAP * (activeWeek.length - 1)) / activeWeek.length;

  // Scroll to the correct week on mount or when index changes
  useEffect(() => {
    scrollViewRef.current?.scrollTo({
      x: activeWeekIndex * windowWidth,
      animated: false,
    });
  }, [activeWeekIndex, windowWidth]);

  return (
    <View style={{ height: MAX_BAR_HEIGHT + LABEL_HEIGHT, width: windowWidth }}>
      {/* Bar Chart */}
      <View
        style={[
          styles.barRow,
          { gap: GAP, marginHorizontal: (windowWidth - BAR_CHART_WIDTH) / 2 },
        ]}
      >
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
        pagingEnabled // ✅ use native paging instead of snapToInterval
        decelerationRate="fast" // ✅ still useful
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16} // ✅ react to scrolls quickly
        onScroll={({ nativeEvent }) => {
          const scrollOffset = nativeEvent.contentOffset.x;
          const activeIndex = Math.round(scrollOffset / windowWidth);
          onWeekChange(activeIndex);
        }}
        style={{
          width: windowWidth,
          height: LABEL_HEIGHT,
        }}
      >
        {weeks.map((week, index) => {
          const start = DateTime.fromJSDate(week[0]?.day);
          const end = DateTime.fromJSDate(week[6]?.day);

          const label =
            start.month === end.month
              ? `${start.day} – ${end.day} ${start.toFormat("MMMM")}`
              : `${start.day} ${start.toFormat("MMMM")} – ${
                  end.day
                } ${end.toFormat("MMMM")}`;

          return (
            <View
              key={index}
              style={{
                width: windowWidth,
                height: LABEL_HEIGHT,
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
    height: 150,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  label: {
    color: "white",
    fontSize: 14,
    fontFamily: "FiraCode-Regular",
  },
});
