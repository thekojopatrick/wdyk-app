import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import CustomHeader from "@/components/header/CustomHeader";
import { FocusAwareStatusBar, SafeAreaView, ThemedText, View } from "@/ui";

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar />
      <Stack.Screen
        options={{
          header: () => (
            <CustomHeader title="Dashboard" titleVariant="largeTitle" />
          ),
        }}
      />
      <View className="h-full w-full px-5">
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <View className="">
            <ThemedText variant="title3" className="">
              Dashboard
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
