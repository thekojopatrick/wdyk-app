import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
//import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LeaderboardHeader } from "@/components/header";
import CustomHeader from "@/components/header/CustomHeader";
import LeaderboardScreen from "@/components/leaderboard/LeaderboardScreen";
import { EmptyList, FocusAwareStatusBar, Text, ThemedText, View } from "@/ui";

export default function Leaderboard() {
  const router = useRouter();
  return (
    <>
      {/* <StatusBar style="light" /> */}
      <View className="h-full w-full px-5">
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <View className="">
            <ThemedText variant="title3" className="">
              Welcome back! Kojo
            </ThemedText>
            <LeaderboardScreen navigation={router} />
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 40,
    flex: 1,
  },
});
