import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/theme";
import { Button, ThemedText } from "@/ui";
import { NotificationIcon, Settings as SettingsIcon } from "@/ui/icons";
import { Ionicons } from "@expo/vector-icons";

interface CustomHeaderProps {
  title?: string;
  titleVariant?: "largeTitle" | "title1" | "title2";
  children?: React.ReactNode;
}

const LeaderboardHeader: React.FC<CustomHeaderProps> = ({
  title,
  children,
  titleVariant = "largeTitle",
}) => {
  return (
    <>
      <View style={styles.container} className="border-b-2 border-gray-100">
        <ThemedText variant={titleVariant} className="font-semibold text-white">
          Leaderboard
        </ThemedText>
        <View className="flex flex-row items-center gap-2"></View>
      </View>
    </>
  );
};

export default LeaderboardHeader;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: Colors.light.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    height: 348 - StatusBar.currentHeight,
    gap: 20,
    backgroundColor: colors.primary[600],
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: StatusBar.currentHeight || 70,
    paddingHorizontal: 20,
  },
});
