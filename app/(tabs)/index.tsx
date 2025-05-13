import { CompletedBar, ExpenceCard, ThemedText } from "@/components";
import { GAP } from "@/constants";

import { TabScreenLayout } from "@/layout";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  // return <Redirect href="/task" />;

  return (
    <TabScreenLayout>
      <SafeAreaView />
      <ThemedText size="extraLarge" font="bold">
        Hello John Smith {"\n"}
        <ThemedText size="small">Welcome Back !</ThemedText>
      </ThemedText>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <CompletedBar />
        <View style={styles.rightContainer}>
          <ExpenceCard />
          <ExpenceCard />
        </View>
      </View>
    </TabScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {},
  rightContainer: {
    gap: GAP * 1.5,
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
