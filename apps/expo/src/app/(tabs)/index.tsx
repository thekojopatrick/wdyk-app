import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import CustomHeader from "@/components/header/CustomHeader";
import { EmptyList, FocusAwareStatusBar, Text, View } from "@/ui";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar />
      <Stack.Screen options={{ header: () => <CustomHeader /> }} />
      <View className="h-full w-full border border-purple-300 px-4">
        <Text className="text-3xl font-bold text-primary">Home</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    //top: 50,
    flex: 1,
  },
});
