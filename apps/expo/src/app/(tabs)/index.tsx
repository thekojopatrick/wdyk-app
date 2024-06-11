import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
//import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import CustomHeader from "@/components/header/CustomHeader";
import { EmptyList, FocusAwareStatusBar, Text, ThemedText, View } from "@/ui";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar />
      <Stack.Screen
        options={{ header: () => <CustomHeader title="Gameplay" /> }}
      />
      <View className="h-full w-full px-4">
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <ThemedText className="">Welcome back! Kojo</ThemedText>
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
