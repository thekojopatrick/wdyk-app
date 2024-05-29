import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
import { Button } from "@/ui";

export default function Index() {
  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: "Home" }} />
      <View className="h-full w-full p-4">
        <Text className="pb-2 text-center text-5xl font-bold text-foreground">
          <Text className="text-primary">T3</Text> Turbo
        </Text>
        <View style={styles.container}>
          <View style={styles.main}>
            <Text style={styles.title}>Hello World</Text>
            <Text style={styles.subtitle}>
              This is the first page of your app.
            </Text>
          </View>
        </View>
        <Link href={"/post"} asChild>
          <Button label="Go to Post" />
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
