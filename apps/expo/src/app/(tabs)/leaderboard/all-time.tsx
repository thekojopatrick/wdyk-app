import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
//import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LeaderboardHeader } from "@/components/header";
import CustomHeader from "@/components/header/CustomHeader";
import LeaderboardScreen from "@/components/leaderboard/LeaderboardScreen";
import { EmptyList, FocusAwareStatusBar, Text, ThemedText, View } from "@/ui";

import { topUsers, users } from ".";

export default function Leaderboard() {
  const router = useRouter();
  return (
    <>
      <StatusBar style="light" />
      <View className="h-full w-full">
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <View className="">
            <LeaderboardScreen data={users} topRank={topUsers} />
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 40,
    flex: 1,
  },
});
