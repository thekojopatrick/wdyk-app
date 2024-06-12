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

const topUsers = [
  { name: "Arlene McCoy", points: 250, avatar: "heart", rank: 3 },
  { name: "Guy Hawkins", points: 305, avatar: "adinkrahene", rank: 1 },
  { name: "Dianne Russell", points: 195, avatar: "snowflake", rank: 2 },
];

const users = [
  { name: "Arlene McCoy", points: 305, avatar: "heart", rank: 1 },
  { name: "Guy Hawkins", points: 305, avatar: "heart", rank: 2 },
  { name: "Dianne Russell", points: 305, avatar: "snowflake", rank: 3 },
  { name: "Jenny Wilson", points: 305, avatar: "target", rank: 4 },
  { name: "Courtney Henry", points: 305, avatar: "spiral", rank: 5 },
  { name: "Robert Fox", points: 305, avatar: "calendar", rank: 6 },
  { name: "Brooklyn Simmons", points: 305, avatar: "magnifier", rank: 7 },
  { name: "Ralph Edwards", points: 305, avatar: "adinkrahene", rank: 8 },
];

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
