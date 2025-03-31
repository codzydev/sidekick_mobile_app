/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    primaryText: "#2C2C2C",
    secondaryText: "#5A5A5A",
    tertiaryText: "#xxx",
    background: "#FAFAFA",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    card: "#F2F2F2",
    shadow: "#E0E0E0",
  },
  dark: {
    primaryText: "#ECEDEE", //for Main text, titles, readable on dark bg
    secondaryText: "#A6A6A6", // for Subtext, labels, supporting content
    tertiaryText: "#6E6E6E", //for, placeholders, low-importance text
    background: "#2C2C2C",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    card: "#333338",
    shadow: "#3A3A3A",
    header: "#1F1F1F",
  },
  activeOpacity: 1,
  inactiveOpacity: 0.45,
  primary: "#F7374F",
  secondary: "#F9A826",
  tertiary: "#F9A826",
  success: "#4CAF50",

  task: {
    todo: "#A8A29E",
    inProgress: "#F59E0B",
    completed: "#10B981",
    cancelled: "#71717A",
    pending: "#F9A826",
    overdue: "#F7374F",
    upcoming: "#F9A826",
    scheduled: "#F9A826",
    rescheduled: "#F9A826",
    onHold: "#F97316",
  },
};
