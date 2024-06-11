import React from "react";
import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/theme";

const CustomHeader = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container} className="border-b bg-purple-500">
        <Text className="text-xl font-bold">Custom Header</Text>
      </View>
    </SafeAreaView>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: Colors.light.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flexDirection: "row",
    height: 60,
    gap: 20,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});
