import {
  AnalyticsUpIcon,
  Dashboard as DashboardIcon,
  Home as HomeIcon,
  Trophy as LeaderboardIcon,
  Settings as SettingsIcon,
  User as UserIcon,
} from "@/ui/icons";
import { Link, Redirect, SplashScreen, Tabs } from "expo-router";
import { Pressable, Text } from "@/ui";
/* eslint-disable react/no-unstable-nested-components */
import React, { useCallback, useEffect, useState } from "react";

import { useIsFirstTime } from "@/core";

export default function TabLayout() {
  const status = useState<string>("idle" || "signOut");
  const [isFirstTime] = useIsFirstTime();
  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
  useEffect(() => {
    // if (status !== "idle") {
    //   setTimeout(() => {
    //     hideSplash();
    //   }, 1000);
    // }
  }, [hideSplash, status]);

  // if (isFirstTime) {
  //   return <Redirect href="/onboarding" />;
  // }
  // if (status === "signOut") {
  //   return <Redirect href="/login" />;
  // }
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Gameplay",
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
          tabBarTestID: "home-tab",
        }}
      />

      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Stats",
          tabBarIcon: ({ color }) => <AnalyticsUpIcon color={color} />,
          tabBarTestID: "leaderboard-tab",
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: "Leaderboard",
          headerShown: false,
          tabBarIcon: ({ color }) => <LeaderboardIcon color={color} />,
          tabBarTestID: "leaderboard-tab",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "More",
          tabBarIcon: ({ color }) => <DashboardIcon color={color} />,
          tabBarTestID: "profile-tab",
        }}
      />
    </Tabs>
  );
}

const CreateNewPostLink = () => {
  return (
    <Link href="/feed/add-post" asChild>
      <Pressable>
        <Text className="text-primary-300 px-3">Create</Text>
      </Pressable>
    </Link>
  );
};
