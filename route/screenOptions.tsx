import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors, Margin, Padding } from "@/constants";
import { Image, StyleSheet, View } from "react-native";

export const HEADER_HEIGHT = 50;
const IMAGE_SIZE = 30;

const image_url = "https://cdn-icons-png.flaticon.com/512/13482/13482115.png";

export const tabScreenOptions = {
  headerShown: true,
  headerTransparent: false,
  headerStyle: {
    height: HEADER_HEIGHT,
    backgroundColor: Colors.dark.background,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  headerLeft: () => (
    <View style={styles.headerLeft}>
      <Image
        style={styles.avatar}
        source={{ uri: image_url }}
        resizeMode="cover"
      />
    </View>
  ),
  headerRight: () => (
    <View style={styles.headerRight}>
      <IconSymbol size={IMAGE_SIZE} name="gearshape" color="#1F1F1F" />
    </View>
  ),
  headerTitle: () => null,

  // headerTitle: () => (
  //   <View style={styles.headerTitle}>
  //     <Text style={styles.headerText}>My Title</Text>
  //   </View>
  // ),
};

const styles = StyleSheet.create({
  headerLeft: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: IMAGE_SIZE / 2.5,
    backgroundColor: Colors.light.card,
    marginLeft: Margin.MEDIUM,
    padding: Padding.SMALL / 4,
  },
  headerRight: {
    justifyContent: "center",
    marginRight: Margin.MEDIUM,
    backgroundColor: Colors.light.card,
    borderRadius: IMAGE_SIZE / 2.5,
    padding: Padding.SMALL / 4,
  },
  headerTitle: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  headerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
