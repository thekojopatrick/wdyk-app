import React from "react";
import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
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
  titleVariant = "title1",
}) => {
  const navigation = useRouter();
  return (
    <>
      <View style={styles.container}>
        <ThemedText variant={titleVariant} className="font-semibold text-white">
          Leaderboard
        </ThemedText>
        <View className="flex flex-row items-center justify-center gap-2">
          <View style={styles.tabs}>
            <Text
              style={styles.tabText}
              onPress={() => navigation.navigate("/(tabs)/leaderboard/")}
            >
              WEEKLY
            </Text>
            <Text
              style={styles.tabText}
              onPress={() =>
                navigation.navigate("/(tabs)/leaderboard/all-time")
              }
            >
              ALL TIME
            </Text>
          </View>
        </View>
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
    height: StatusBar.currentHeight,
    gap: 20,
    backgroundColor: colors.primary[600],
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  tabText: {
    color: "#fff",
    fontSize: 16,
  },
});
