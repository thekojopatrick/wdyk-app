import React from "react";
import { Redirect } from "expo-router";
import { useAuth } from "@/core/providers";

const Index = () => {
  const { session } = useAuth();

  if (!session) {
    return <Redirect href={"/(auth)/login"} />;
  }

  if (session) return <Redirect href={"/(tabs)/"} />;

  return <Redirect href="/splash" />;
};

export default Index;
