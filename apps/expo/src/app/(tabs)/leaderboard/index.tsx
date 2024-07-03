import React from "react";
import { StatusBar } from "expo-status-bar";
import { topUsers, users } from "@/api/dummyData";
import LeaderboardScreen from "@/components/leaderboard/LeaderboardScreen";
import { View } from "@/ui";

export default function Leaderboard() {
  return (
    <>
      <StatusBar style="light" />
      <View className="h-full w-full">
        <LeaderboardScreen data={users} topRank={topUsers} />
      </View>
    </>
  );
}
