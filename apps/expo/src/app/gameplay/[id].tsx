import { SafeAreaView, Text, View } from "react-native";
import { Stack, useGlobalSearchParams } from "expo-router";

import { api } from "@/utils/api";

export default function Gameplay() {
  const { id } = useGlobalSearchParams();
  if (!id || typeof id !== "string") throw new Error("unreachable");

  return (
    <SafeAreaView className="bg-background">
      <Stack.Screen options={{ title: "Wordplay" }} />
      <View className="h-full w-full p-4">
        <Text className="py-2 text-3xl font-bold text-primary">
          {"Wordplay"}
        </Text>
        <Text className="py-4 text-foreground">{"Body"}</Text>
      </View>
    </SafeAreaView>
  );
}
