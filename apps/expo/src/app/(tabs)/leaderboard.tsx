import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
//import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import CustomHeader from "@/components/header/CustomHeader";
import { EmptyList, FocusAwareStatusBar, Text, ThemedText, View } from "@/ui";

export default function Leaderboard() {
  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar />
      <Stack.Screen
        options={{
          header: () => (
            <CustomHeader title="Leaderboard" titleVariant="largeTitle" />
          ),
        }}
      />
      <View className="h-full w-full px-5">
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <View className="">
            <ThemedText variant="title3" className="">
              Welcome back! Kojo
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
