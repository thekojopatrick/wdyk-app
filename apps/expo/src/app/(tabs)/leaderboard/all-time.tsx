import { topUsers, users } from "@/api/dummyData";

import LeaderboardScreen from "@/components/leaderboard/LeaderboardScreen";
import React from "react";
import { StatusBar } from "expo-status-bar";
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

