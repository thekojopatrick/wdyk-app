import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Redirect, Stack } from "expo-router";
import { gameplay } from "@/api/dummyData";
import DailyGameChallenge from "@/components/gameplay/ChallengeCard";
import { GameInfoModal } from "@/components/gameplay/GameInfoModal";
import CustomHeader from "@/components/header/CustomHeader";
import { useAuth } from "@/core/providers";
import { FocusAwareStatusBar, ThemedText, View } from "@/ui";

export default function Home() {
  const { session, profile, userName } = useAuth();

  console.log({ profile });
  if (!userName) {
    return <Redirect href="/account/setting-up-profile" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar />
      <Stack.Screen
        options={{
          header: () => (
            <CustomHeader
              title={`Welcome ${userName || "User"}!`}
              titleVariant="title1"
            />
          ),
        }}
      />
      <View className="h-full w-full px-5">
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <View className="mt-2">
            <ThemedText variant="title3" className="mb-3">
              Daily Challenge
            </ThemedText>
            <GameInfoModal gameplay={gameplay}>
              <DailyGameChallenge
                title={"Today's Challenge"}
                body={
                  "Ready for a new word puzzle?Test your skills with today's challenge!"
                }
              />
            </GameInfoModal>
          </View>
          <View className="mt-6">
            <ThemedText variant="title3" className="">
              Explore Games
            </ThemedText>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 40,
    flex: 1,
  },
});
