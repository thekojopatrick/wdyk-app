import React from "react";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { withLayoutContext } from "expo-router";
import LeaderboardScreen from "@/components/leaderboard/LeaderboardScreen";
import { TopTabBar } from "@/components/navigations";
import { colors } from "@/theme";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

const LeaderboardNavigator = () => {
  return (
    <>
      {/* <TopTabs initialRouteName="index">
        <TopTabs.Screen
          name="index"
          options={{
            title: "Weekly",
          }}
        />
        <TopTabs.Screen name="all-time" options={{ title: "All time" }} />
      </TopTabs> */}
      <TopTabs screenOptions={{ tabBarStyle: { display: "none" } }} />
    </>
  );
};

export default LeaderboardNavigator;
