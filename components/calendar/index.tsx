import { Colors } from "@/constants/Colors";
import {
  calendarData,
  dayData,
  getDaysInMonthSplitByWeek,
  weekData,
} from "@/helpers";
import { DateTime } from "luxon";
import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
  type ReactElement,
} from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
  type ListRenderItemInfo,
  type ScaledSize,
} from "react-native";
import { ThemedText } from "../common";

export const Calendar = (): ReactElement => {
  const windowDimensions: ScaledSize = Dimensions.get("window");
  const dayItemWidth = useRef<number>(windowDimensions.width / 7);
  const [dateData, setDateData] = useState<calendarData | undefined>(undefined);
  const [todayIndex, setTodayIndex] = useState<number>(0);
  const [currentMonth, setCurrentMonth] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<DateTime | null>(null);
  const isDark = useColorScheme() === "dark";
  const color = isDark ? Colors.dark.text : Colors.light.text;

  useEffect(() => {
    const currentMonthData = getCurrentMonth();
    setDateData(currentMonthData);
    setCurrentMonth(
      getMonthRange(
        currentMonthData[0],
        currentMonthData[currentMonthData.length - 1]
      )
    );
    setSelectedDate(DateTime.now());
  }, []);

  useEffect(() => {
    if (dateData) {
      setTodayIndex(getTodayIndex(dateData));
    }
  }, [dateData]);

  // Helper functions
  const getCurrentMonth = (): calendarData => {
    const now: DateTime = DateTime.now();
    return getDaysInMonthSplitByWeek(now.month, now.year, true);
  };

  const getMonthRange = (startWeek: weekData, endWeek: weekData): string => {
    const startMonth = getMonthName(startWeek[0].date);
    const endMonth = getMonthName(endWeek[endWeek.length - 1].date);

    // If both months are the same, return just the start month with its year
    if (startMonth === endMonth) {
      return `${startMonth}`; // Only the month name
    }

    // If the months are different, return the range with the starting and ending months
    return `${startWeek[0].date.toFormat("MMM")} / ${endMonth}`;
  };

  const getMonthName = (date: DateTime): string => date.toFormat("MMM yyyy");

  const getTodayIndex = (dateArray: calendarData): number => {
    return dateArray.findIndex((item: weekData) =>
      item.some((subItem: dayData) => subItem.isToday)
    );
  };

  const handleScroll = (event: any) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / windowDimensions.width
    );
    if (dateData && index !== todayIndex) {
      setTodayIndex(index);
      setCurrentMonth(getMonthRange(dateData[index], dateData[index]));
      //   console.log("Current Week:", dateData[index]); //curernt week
    }
  };

  const handleDaySelect = (date: DateTime) => {
    setSelectedDate(date);
    console.log("Selected Date:", date.toFormat("yyyy-MM-dd"));
  };

  const generateCurrentWeek = (): ReactElement[] => {
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return daysOfWeek.map((day, index) => {
      const isWeekend = day === "Sat" || day === "Sun";
      return (
        <View
          key={index}
          style={{
            ...styles.dayItem,
            marginBottom: 8,
            width: dayItemWidth.current,
          }}
        >
          <ThemedText
            style={{
              color: isWeekend ? Colors.primary : color,
              ...styles.weekHeaderText,
            }}
          >
            {day}
          </ThemedText>
        </View>
      );
    });
  };

  const isSelectedDay = (date: DateTime): boolean => {
    return selectedDate?.toFormat("yyyy-MM-dd") === date.toFormat("yyyy-MM-dd");
  };

  const renderWeek = (week: weekData): ReactElement => {
    return (
      <Fragment>
        {week.map((day: dayData) => (
          <TouchableOpacity
            onPress={() => handleDaySelect(day.date)}
            key={day.date.toString()}
            style={{
              ...styles.dayItem,
              height: dayItemWidth.current,
              width: dayItemWidth.current,

              backgroundColor:
                isDark && isSelectedDay(day.date)
                  ? Colors.light.background
                  : !isDark && isSelectedDay(day.date)
                  ? Colors.dark.background
                  : "transparent",
            }}
          >
            <ThemedText
              style={{
                color: isDark
                  ? isSelectedDay(day.date)
                    ? Colors.light.text
                    : Colors.dark.text
                  : isSelectedDay(day.date)
                  ? Colors.dark.text
                  : Colors.light.text,
                opacity: isSelectedDay(day.date)
                  ? Colors.activeOpacity
                  : Colors.inactiveOpacity,
                fontWeight: "600",
              }}
            >
              {day.date.day}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </Fragment>
    );
  };

  return (
    <View>
      <ThemedText style={styles.headerText} type="title">
        {currentMonth}
      </ThemedText>
      {/* <Text style={styles.headerText}>{currentMonth}</Text> */}
      <View style={styles.weekHeaderContainer}>{generateCurrentWeek()}</View>
      {dateData && (
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={dateData}
          renderItem={({ item }: ListRenderItemInfo<weekData>) =>
            renderWeek(item)
          }
          snapToAlignment="start"
          snapToInterval={windowDimensions.width}
          decelerationRate="fast"
          initialScrollIndex={todayIndex}
          getItemLayout={(
            data: ArrayLike<weekData> | null | undefined,
            index: number
          ) => ({
            length: windowDimensions.width,
            offset: windowDimensions.width * index,
            index,
          })}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          keyExtractor={(item: weekData, index: number) => index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 18,
    marginLeft: 10,
  },
  weekHeaderText: {
    fontWeight: "600",
  },
  weekHeaderContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dayItem: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
});
