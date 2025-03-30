import { Padding } from "@/constants/Spacing";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Event } from "@/types/agenda";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../common";

interface EventDetails {
  topOffset: number;
  height: number;
  duration: string;
}

interface EventCardProps {
  event: Event;
  details: EventDetails;
}

export const EventCard: React.FC<EventCardProps> = ({ event, details }) => {
  const { topOffset, height, duration } = details;
  const backgroundColor = useThemeColor({}, "card");

  return (
    <View
      key={event.id}
      style={[
        styles.eventCard,
        {
          backgroundColor,
        },
        {
          top: topOffset,
          height,
        },
      ]}
    >
      <View style={styles.eventInner}>
        <View style={styles.eventContent}>
          <View style={styles.cardHeader}>
            <ThemedText
              numberOfLines={1}
              style={styles.eventTitle}
              type="title"
            >
              {event.title}
            </ThemedText>
          </View>
          <ThemedText numberOfLines={1} style={styles.eventDesc}>
            {event.suburb} {event.state} {event.postcode}
          </ThemedText>
        </View>
        <ThemedText style={styles.eventTime} type="subtitle">
          {duration}
        </ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  eventCard: {
    position: "absolute",
    left: 60,
    right: 10,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  eventInner: {
    flex: 1,
    padding: Padding.MEDIUM,
  },
  eventContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eventTitle: {
    fontWeight: "600",
  },
  eventDesc: {
    fontSize: 12,
    lineHeight: 18,
  },
  eventTime: {
    fontSize: 13,
  },
});
