import { CompletedBar, ThemedText } from "@/components";

import { TabScreenLayout } from "@/layout";
import { StyleSheet, View } from "react-native";

const HomeScreen = () => {
  // return <Redirect href="/task" />;

  return (
    <TabScreenLayout>
      <ThemedText size="large" font="bold">
        Hello John Smith
      </ThemedText>
      <ThemedText size="small">Welcome Back !</ThemedText>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <CompletedBar />
      </View>
    </TabScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default HomeScreen;
