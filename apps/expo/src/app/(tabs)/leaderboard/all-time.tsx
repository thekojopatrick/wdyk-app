import React from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { topUsers, users } from "@/api/dummyData";
import LeaderboardScreen from "@/components/leaderboard/LeaderboardScreen";
import { View } from "@/ui";

export default function Leaderboard() {
  return (
    <>
      <StatusBar style="light" />
      {/* <FocusAwareStatusBar /> */}
      <View className="h-full w-full">
        <View className="">
          <LeaderboardScreen data={users} topRank={topUsers} />
        </View>
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
