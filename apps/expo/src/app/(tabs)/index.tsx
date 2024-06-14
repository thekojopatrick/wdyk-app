import { EmptyList, FocusAwareStatusBar, Text, ThemedText, View } from "@/ui";
import { SafeAreaView, StyleSheet } from "react-native";

import { Card } from "@/components/card";
import CustomHeader from "@/components/header/CustomHeader";
import DailyGameChallenge from "@/components/gameplay/ChallengeCard";
import { GameInfoModal } from "@/components/gameplay/GameInfoModal";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
//import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar />
      <Stack.Screen
        options={{
          header: () => (
            <CustomHeader title="Welcome Kojo!" titleVariant="title1" />
          ),
        }}
      />
      <View className="h-full w-full px-5">
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <View className="mt-2">
            <ThemedText variant="title3" className="mb-3">
              Daily Challenge
            </ThemedText>
            <GameInfoModal>
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
