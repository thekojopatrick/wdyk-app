import { SafeAreaView, View } from "react-native";
import { Stack, useGlobalSearchParams } from "expo-router";
import GamePlayScreen from "@/components/gameplay/GamePlayScreen";
import GamePlayHeader from "@/components/header/GamePlayHeader";
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
