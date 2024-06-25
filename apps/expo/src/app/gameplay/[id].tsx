import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import { Stack, useGlobalSearchParams } from "expo-router";
import { useGeminiAPI } from "@/api/gemini";
import GamePlayScreen from "@/components/gameplay/GamePlayScreen";
import GamePlayHeader from "@/components/header/GamePlayHeader";
import { colors } from "@/theme";

export default function Gameplay() {
  const { id } = useGlobalSearchParams();
  if (!id || typeof id !== "string") throw new Error("unreachable");
  const { data, error, isLoading } = useGeminiAPI();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error fetching data: {error.message}</Text>;
  }

  console.log({ data });

  return (
    <SafeAreaView style={{ backgroundColor: colors.primary[600] }}>
      <Stack.Screen
        options={{ header: () => <GamePlayHeader title="Wordplay" /> }}
      />
      <View className="mt-6">
        <GamePlayScreen data={data as []} />
      </View>
    </SafeAreaView>
  );
}
