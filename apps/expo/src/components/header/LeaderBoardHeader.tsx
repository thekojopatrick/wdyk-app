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

interface CustomHeaderProps {
  title?: string;
  titleVariant?: "largeTitle" | "title1" | "title2";
  children?: React.ReactNode;
}

const LeaderboardHeader: React.FC<CustomHeaderProps> = ({
  titleVariant = "title1",
}) => {
  const navigation = useRouter();

  const segments = useSegments();
  const lastSegments = segments[segments.length - 1];

  function handleTabPressed(path: string) {
    if (lastSegments === "leaderboard") {
      navigation.navigate(path);
    } else {
      navigation.navigate(path);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <ThemedText variant={titleVariant} className="font-semibold text-white">
          Leaderboard
        </ThemedText>
        <View className="flex flex-row items-center justify-center gap-2">
          <View style={styles.tabs}>
            <Pressable
              style={[
                {
                  backgroundColor:
                    lastSegments === "leaderboard"
                      ? colors.white
                      : colors.primary[600],
                },
              ]}
              onPress={() => handleTabPressed("/(tabs)/leaderboard/")}
              className="rounded-full transition-all"
            >
              <Text
                style={{
                  color:
                    lastSegments === "leaderboard"
                      ? colors.primary[600]
                      : colors.white,
                  fontSize: 12,
                }}
                className="px-2 py-1 transition-colors"
              >
                WEEKLY
              </Text>
            </Pressable>
            <Pressable
              style={[
                {
                  backgroundColor:
                    lastSegments === "all-time"
                      ? colors.white
                      : colors.primary[600],
                },
              ]}
              onPress={() => handleTabPressed("/(tabs)/leaderboard/all-time")}
              className="rounded-full transition-all"
            >
              <Text
                style={{
                  color:
                    lastSegments === "all-time"
                      ? colors.primary[600]
                      : colors.white,
                  fontSize: 12,
                }}
                className="px-2 py-1 transition-colors"
              >
                ALL TIME
              </Text>
            </Pressable>
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
