import { ThemedView } from "@/components/common/ThemedView";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

const HomeScreen = () => {
  // return <Redirect href="/task" />;

  return (
    <ThemedView style={{ flex: 1 }}>
      <Link href="/task">Go to Tasks --------- </Link>
    </ThemedView>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
