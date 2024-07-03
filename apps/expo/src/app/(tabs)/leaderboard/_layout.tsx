import React from "react";
import { withLayoutContext } from "expo-router";
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
