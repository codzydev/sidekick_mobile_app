import { Colors } from "@/constants/Colors";
import { Event } from "@/types/agenda";
import React from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";

const HOUR_HEIGHT = 60;

interface TimeSlot {
  label: string;
  minutes: number;
}

interface TimeSlotsProps {
  timeSlots: TimeSlot[];
  events: Event[];
}

export const TimeSlots: React.FC<TimeSlotsProps> = ({ timeSlots, events }) => {
  const isDark = useColorScheme() === "dark";
  const color = isDark ? Colors.dark.text : Colors.light.text;

  const parseTime = (time: string): number => {
    const [hourMin, period] = time.split(" ");
    const [hour, min] = hourMin.split(":").map(Number);
    let hourNum = hour;
    if (period === "PM" && hourNum !== 12) hourNum += 12;
    if (period === "AM" && hourNum === 12) hourNum = 0;
    return hourNum * 60 + min;
  };

  const doesEventStartExactlyOnHour = (slotMinutes: number): boolean =>
    events.some(
      (event) => parseTime(event.duration.split(" - ")[0]) === slotMinutes
    );

  return (
    <>
      {timeSlots.map((slot, index) => {
        const shouldHideLine = doesEventStartExactlyOnHour(slot.minutes);
        return (
          <View key={index} style={[styles.row, { top: index * HOUR_HEIGHT }]}>
            <Text style={[styles.timeText, { color }]}>{slot.label}</Text>
            {!shouldHideLine && <View style={styles.separator} />}
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    position: "absolute",
    left: 0,
    right: 0,
    height: HOUR_HEIGHT,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  timeText: {
    textAlign: "right",
    marginRight: 10,
    fontSize: 13,
    marginTop: -7,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: "#eee",
    position: "absolute",
    left: 60,
    right: 10,
  },
});
