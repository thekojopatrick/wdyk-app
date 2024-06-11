import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import CustomHeader from "@/components/header/CustomHeader";
import { FocusAwareStatusBar, ThemedText } from "@/ui";

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar />
      <Stack.Screen
        options={{
          header: () => (
            <CustomHeader title="Profile" titleVariant="largeTitle" />
          ),
        }}
      />
      <>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 40 }}
          className="h-full w-full px-5"
        >
          <View className="">
            <ThemedText variant="title3" className="">
              <Text>Profile</Text>
            </ThemedText>
          </View>
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    top: 40,
    flex: 1,
  },
});
