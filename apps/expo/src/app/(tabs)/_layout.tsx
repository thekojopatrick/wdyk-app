/* eslint-disable react/no-unstable-nested-components */
import React, { useCallback, useEffect, useState } from "react";
import { Link, Redirect, SplashScreen, Tabs } from "expo-router";
import { LeaderboardHeader } from "@/components/header";
import { useAuth, useIsFirstTime } from "@/core";
import { Pressable, Text } from "@/ui";
import {
  AnalyticsUpIcon,
  Dashboard as DashboardIcon,
  Home as HomeIcon,
  Trophy as LeaderboardIcon,
} from "@/ui/icons";

export default function TabLayout() {
  const { status, session, userName } = useAuth();
  const [isFirstTime] = useIsFirstTime();

  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    if (status !== "idle") {
      setTimeout(() => {
        hideSplash();
      }, 1000);
    }
  }, [hideSplash, status]);

  if (isFirstTime && !session) {
    return <Redirect href="/splash" />;
  }
  if (!session) {
    console.log({ status });

    return <Redirect href="/login" />;
  }

  if (status === "signOut") {
    return <Redirect href="/(auth)/login" />;
  }

  if (session) {
    console.log({ userName, status });
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

const CreateNewPostLink = () => {
  return (
    <Link href="/feed/add-post" asChild>
      <Pressable>
        <Text className="text-primary-300 px-3">Create</Text>
      </Pressable>
    </Link>
  );
};
