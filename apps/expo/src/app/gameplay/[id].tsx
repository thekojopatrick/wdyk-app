import { SafeAreaView, Text, View } from "react-native";
import { Stack, useGlobalSearchParams } from "expo-router";

import GamePlayHeader from "@/components/header/GamePlayHeader";
import GamePlayScreen from "@/components/gameplay/GamePlayScreen";
import { api } from "@/utils/api";
import { colors } from "@/theme";

export default function Gameplay() {
  const { id } = useGlobalSearchParams();
  if (!id || typeof id !== "string") throw new Error("unreachable");

  return (
    <SafeAreaView style={{ backgroundColor: colors.primary[600] }}>
      <Stack.Screen
        options={{ header: () => <GamePlayHeader title="Wordplay" /> }}
      />
      <View className="mt-6">
        <GamePlayScreen />
      </View>
    </SafeAreaView>
  );
}
