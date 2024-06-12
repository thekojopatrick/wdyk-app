import React, { useState } from "react";
import {
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { usePathname, useRouter, useSegments } from "expo-router";
import { colors } from "@/theme";
import { Button, ThemedText } from "@/ui";
import { NotificationIcon, Settings as SettingsIcon } from "@/ui/icons";
import { Ionicons } from "@expo/vector-icons";

interface TopTabBarProps {
  label: string;
  activeTab: string;
  pathName: string;
}

const TopTabBar = ({ label, pathName, activeTab }: TopTabBarProps) => {
  const navigation = useRouter();

  const segments = useSegments();
  const lastSegments = segments[segments.length - 1];

  function handleTabPressed() {
    navigation.navigate(pathName);
  }
  return (
    <Pressable
      style={[
        {
          backgroundColor:
            lastSegments === activeTab ? colors.white : colors.primary[600],
        },
      ]}
      onPress={handleTabPressed}
      className="rounded-full transition-all"
    >
      <Text
        style={{
          color:
            lastSegments === activeTab ? colors.primary[950] : colors.white,
          fontSize: 12,
        }}
        className="px-2 py-1 uppercase transition-colors"
      >
        {label}
      </Text>
    </Pressable>
  );
};

const LeaderboardHeader: React.FC = ({}) => {
  return (
    <>
      <View style={styles.container}>
        <ThemedText variant={"title1"} className="font-semibold text-white">
          Leaderboard
        </ThemedText>
        <View className="flex flex-row items-center justify-center gap-2">
          <View style={styles.tabs}>
            <TopTabBar
              label="Weekly"
              pathName="/(tabs)/leaderboard/"
              activeTab="leaderboard"
            />
            <TopTabBar
              label="All time"
              pathName="/(tabs)/leaderboard/all-time"
              activeTab="all-time"
            />
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
    alignItems: "center",
    gap: 10,
  },
});
