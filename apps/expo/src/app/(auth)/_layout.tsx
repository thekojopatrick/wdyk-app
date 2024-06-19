import { ActivityIndicator, SafeAreaView } from "@/ui";
import { Redirect, Stack } from "expo-router";

import React from "react";
import { View } from "moti";
import { useAuth } from "@/core/providers";

const AuthLayout = () => {
  const { session, loading, profile } = useAuth();

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View className="h-full w-full items-center justify-center">
          <ActivityIndicator />
        </View>
      </SafeAreaView>
    );
  }

  if (session && !profile.username) {
    return <Redirect href={"/(auth)/setting-up-profile"} />;
  }

  if (session) {
    return <Redirect href={"/(tabs)/"} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default AuthLayout;
