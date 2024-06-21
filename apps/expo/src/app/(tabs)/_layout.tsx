import React, { useCallback, useEffect } from "react";
import { Redirect, SplashScreen, Tabs } from "expo-router";
import { LeaderboardHeader } from "@/components/header";
import { useAuth, useIsFirstTime } from "@/core";
import {
  AnalyticsUpIcon,
  Dashboard as DashboardIcon,
  Home as HomeIcon,
  Trophy as LeaderboardIcon,
} from "@/ui/icons";

export default function TabLayout() {
  const { status, session } = useAuth();
  const [isFirstTime] = useIsFirstTime();

  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    if (status !== "idle") {
      setTimeout(() => {
        void hideSplash();
      }, 1000);
    }
  }, [hideSplash, status]);

  if (isFirstTime && !session) {
    return <Redirect href="/splash" />;
  }
  if (!session) {
    return <Redirect href="/login" />;
  }

  if (status === "signOut") {
    return <Redirect href="/(auth)/login" />;
  }

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
          //headerShown: false,
          header: () => <LeaderboardHeader />,
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
