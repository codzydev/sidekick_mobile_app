import { Colors } from "@/constants/colors";
import { Margin } from "@/constants/spacing";
import {
  calendarData,
  dayData,
  getDaysInMonthSplitByWeek,
  getTodayIndex,
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
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
  type ListRenderItemInfo,
} from "react-native";
import { ThemedText } from "../common/ThemedText";

type CalendarProps = {
  width: number;
  style: ViewStyle;
};

export const Calendar = ({ width, style }: CalendarProps): ReactElement => {
  const dayItemWidth = useRef<number>(width / 7); // 👈 use prop width
  const [dateData, setDateData] = useState<calendarData | undefined>(undefined);
  const [todayIndex, setTodayIndex] = useState<number | undefined>(undefined);
  const [currentMonth, setCurrentMonth] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<DateTime | null>(null);
  const isDark = useColorScheme() === "dark";
  const color = isDark ? Colors.dark.secondaryText : Colors.light.secondaryText;

  useEffect(() => {
    dayItemWidth.current = width / 7; // Recalculate if width changes
  }, [width]);

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

  const getCurrentMonth = (): calendarData => {
    const now: DateTime = DateTime.now();
    return getDaysInMonthSplitByWeek(now.month, now.year, true);
  };

  const getMonthRange = (startWeek: weekData, endWeek: weekData): string => {
    const startMonth = getMonthName(startWeek[0].date);
    const endMonth = getMonthName(endWeek[endWeek.length - 1].date);
    if (startMonth === endMonth) {
      return `${startMonth}`;
    }
    return `${startWeek[0].date.toFormat("MMM")} / ${endMonth}`;
  };

  const getMonthName = (date: DateTime): string => date.toFormat("MMM yyyy");

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    if (dateData) {
      setCurrentMonth(getMonthRange(dateData[index], dateData[index]));
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
            type="defaultSemiBold"
            style={{
              color: isWeekend ? Colors.primary : color,
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
                fontFamily: isSelectedDay(day.date)
                  ? "Poppins_700Bold"
                  : "Poppins_400Regular",
                color: isDark
                  ? isSelectedDay(day.date)
                    ? Colors.light.primaryText
                    : Colors.dark.primaryText
                  : isSelectedDay(day.date)
                  ? Colors.dark.primaryText
                  : Colors.light.primaryText,
                opacity: isSelectedDay(day.date)
                  ? Colors.activeOpacity
                  : Colors.inactiveOpacity,
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
    <View style={{ width, ...style }}>
      <ThemedText style={styles.headerText} type="title">
        {currentMonth}
      </ThemedText>
      <View style={styles.weekHeaderContainer}>{generateCurrentWeek()}</View>
      {dateData && todayIndex !== undefined && (
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={dateData}
          renderItem={({ item }: ListRenderItemInfo<weekData>) =>
            renderWeek(item)
          }
          snapToAlignment="start"
          snapToInterval={width}
          decelerationRate="fast"
          initialScrollIndex={todayIndex}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          keyExtractor={(item: weekData, index: number) => index.toString()}
          contentContainerStyle={styles.contentContainerStyle}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    marginLeft: Margin.SMALL,
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
  contentContainerStyle: {},
});
