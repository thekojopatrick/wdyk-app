import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/theme";
import { ThemedText } from "@/ui";

interface CustomHeaderProps {
  title?: string;
  titleVariant?: "largeTitle" | "title1" | "title2";
  children?: React.ReactNode;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  children,
  titleVariant = "title1",
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container} className="border-b-2 border-gray-100">
        <ThemedText variant={titleVariant} className="font-semibold">
          {title}
        </ThemedText>
        {children}
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
