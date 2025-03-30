import { Padding } from "@/constants/Spacing";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Event } from "@/types/agenda";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { EventCard } from "./EventCard";
import { TimeSlots } from "./TimeSlots";

const HOUR_HEIGHT = 60;
const START_HOUR = 8;
const TOTAL_HOURS = 13;

const timeSlots = Array.from({ length: TOTAL_HOURS }, (_, i) => {
  const hour = START_HOUR + i;
  const labelHour = hour > 12 ? hour - 12 : hour;
  const period = hour >= 12 ? "PM" : "AM";
  return {
    label: `${labelHour.toString().padStart(2, "0")} ${period}`,
    minutes: hour * 60,
  };
});

const parseTime = (time: string): number => {
  const [hourMin, period] = time.split(" ");
  const [hour, min] = hourMin.split(":").map(Number);
  let hourNum = hour;
  if (period === "PM" && hourNum !== 12) hourNum += 12;
  if (period === "AM" && hourNum === 12) hourNum = 0;
  return hourNum * 60 + min;
};

const getEventDetails = (duration: string) => {
  const [start, end] = duration.split(" - ");
  const startMinutes = parseTime(start);
  const endMinutes = parseTime(end);

  return {
    topOffset: (startMinutes - START_HOUR * 60) * (HOUR_HEIGHT / 60),
    height: (endMinutes - startMinutes) * (HOUR_HEIGHT / 60),
    duration,
  };
};

const events: Array<Event> = [
  {
    id: "1",
    title: "Interior wall painting – Smith Residence",
    streetAddress: "12 Bellevue St",
    suburb: "Glebe",
    city: "Sydney",
    state: "NSW",
    postcode: "2037",
    country: "Australia",
    duration: "8:00 AM - 10:00 AM",
  },
  {
    id: "3",
    title: "Exterior repaint – Cafe Courtyard",
    streetAddress: "88 King St",
    suburb: "Newtown",
    city: "Sydney",
    state: "NSW",
    postcode: "2042",
    country: "Australia",
    duration: "12:00 PM - 3:00 PM",
  },
  {
    id: "4",
    title: "Prep & sanding – Heritage townhouse",
    streetAddress: "27 Grafton St",
    suburb: "Balmain",
    city: "Sydney",
    state: "NSW",
    postcode: "2041",
    country: "Australia",
    duration: "3:30 PM - 5:00 PM",
  },
];

export const Agenda = () => {
  const backgroundColor = useThemeColor({}, "background");
  return (
    <ScrollView
      contentContainerStyle={[styles.scrollContainer, { backgroundColor }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <TimeSlots timeSlots={timeSlots} events={events} />
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            details={getEventDetails(event.duration)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: Padding.LARGE * 2,
    paddingHorizontal: Padding.LARGE,
    backgroundColor: "red",
    paddingBottom: Padding.LARGE * 4,
  },
  container: {
    height: HOUR_HEIGHT * timeSlots.length,
    position: "relative",
  },
});
