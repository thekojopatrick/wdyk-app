import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/core/providers";
import { ActivityIndicator, SafeAreaView } from "@/ui";
import { View } from "moti";

const AuthLayout = () => {
  const { session, loading } = useAuth();

  console.log({ session });

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View className="h-full w-full items-center justify-center">
          <ActivityIndicator />
        </View>
      </SafeAreaView>
    );
  }

  if (session) {
    return <Redirect href={"/(tabs)/"} />;
  }
  return <Stack screenOptions={{ headerShown: false }} />;
};

export default AuthLayout;
