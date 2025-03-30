import { Colors } from "@/constants/colors";
import { BorderRadius, Padding } from "@/constants/spacing";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Event } from "@/types/agenda";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../common";

interface EventDetails {
  topOffset: number;
  height: number;
  duration: string;
}

interface EventCardProps {
  event: Event;
  details: EventDetails;
  onPress: (event: Event) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  details,
  onPress,
}) => {
  const { topOffset, height, duration } = details;
  const backgroundColor = useThemeColor({}, "card");
  const borderRightColor = Colors.task[event.status];

  return (
    <TouchableOpacity
      onPress={() => onPress(event)}
      key={event.id}
      style={[
        styles.eventCard,
        {
          backgroundColor,
          borderRightColor,
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  eventCard: {
    position: "absolute",
    left: 60,
    right: 10,
    borderRadius: BorderRadius.LARGE,
    borderRightWidth: BorderRadius.LARGE * 0.3,
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
