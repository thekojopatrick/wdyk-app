import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/core/providers";
import { ActivityIndicator, View } from "@/ui";

const AuthLayout = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <>
        <View className="h-full w-full items-center justify-center">
          <ActivityIndicator />
        </View>
      </>
    );
  }

  if (session) {
    return <Redirect href={"/(tabs)/home"} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default AuthLayout;
