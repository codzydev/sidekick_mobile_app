import { DateTime } from "luxon";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

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
      <Animated.View
        style={[
          {
            width: width,
            backgroundColor: "white",
            borderRadius: 15,
            borderCurve: "continuous",
          },
          rStyle,
        ]}
      />
      <Text
        style={{
          width: width,
          textAlign: "center",
          fontSize: 12,
          marginTop: 5,
          textTransform: "uppercase",
          color: "white",
        }}
      >
        {DateTime.fromJSDate(day.day).toFormat("ccc").toUpperCase()}
      </Text>
    </View>
  );
};
