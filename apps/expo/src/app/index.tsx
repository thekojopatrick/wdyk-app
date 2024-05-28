import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";

export default function Index() {
  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="h-full w-full p-4">
        <Text className="pb-2 text-center text-5xl font-bold text-foreground">
          <Text className="text-primary">T3</Text> Turbo
        </Text>
      </View>
    </SafeAreaView>
  );
}
