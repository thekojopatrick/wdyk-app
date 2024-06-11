/* eslint-disable react/no-unstable-nested-components */
import React, { useCallback, useEffect, useState } from "react";
import { Link, Redirect, SplashScreen, Tabs } from "expo-router";
import { useIsFirstTime } from "@/core";
import { Pressable, Text } from "@/ui";
import {
  Feed as FeedIcon,
  Settings as SettingsIcon,
  Style as StyleIcon,
} from "@/ui/icons";

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
          title: "Discover",
          headerShown: false,
          tabBarIcon: ({ color }) => <FeedIcon color={color} />,
          headerRight: () => <CreateNewPostLink />,
          tabBarTestID: "home-tab",
        }}
      />

      <Tabs.Screen
        name="leaderboard"
        options={{
          title: "Leaderboard",
          headerShown: false,
          tabBarIcon: ({ color }) => <StyleIcon color={color} />,
          tabBarTestID: "leaderboard-tab",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
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
