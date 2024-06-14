import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
//import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { Card } from "@/components/card";
import CustomHeader from "@/components/header/CustomHeader";
import { EmptyList, FocusAwareStatusBar, Text, ThemedText, View } from "@/ui";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar />
      <Stack.Screen
        options={{
          header: () => (
            <CustomHeader title="Gameplay" titleVariant="largeTitle" />
          ),
        }}
      />
      <View className="h-full w-full px-5">
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <View className="">
            <ThemedText variant="title3" className="">
              Welcome back! Kojo
            </ThemedText>
            <Card
              userId={0}
              id={0}
              title={"Today's Challenge"}
              body={
                "Ready for a new word puzzle?Test your skills with today's challenge!"
              }
            />
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
