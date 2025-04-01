import { BorderRadius, Margin } from "@/constants";
import { DateTime } from "luxon";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { ThemedText } from "../common/ThemedText";

export type Day = {
  day: Date;
  value: number; // 0 - 1
};

type SingleBarChartProps = {
  maxHeight: number;
  width: number;
  day: Day;
};

export const SingleBarChart = ({
  maxHeight,
  width,
  day,
}: SingleBarChartProps) => {
  const rStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(maxHeight * day.value),
      opacity: withTiming(day.value),
    };
  }, [day.value, maxHeight]);
  return (
    <View>
      <Animated.View style={[styles.bar, { width }, rStyle]} />
      <ThemedText size="extraSmall" style={[styles.text, { width }]}>
        {DateTime.fromJSDate(day.day).toFormat("ccc").charAt(0).toUpperCase()}
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    marginTop: Margin.SMALL / 4,
    textTransform: "uppercase",
  },
  bar: {
    backgroundColor: "white",
    borderRadius: BorderRadius.MEDIUM,
    borderCurve: "continuous",
  },
});
