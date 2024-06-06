import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Button, Image } from "@/ui";
import { PrimaryLogo } from "@/ui/icons";
import Ionicons from "@expo/vector-icons/Ionicons";

const Onboarding = () => {
  return (
    <SafeAreaView>
      <View className="h-full w-full p-4">
        <View className="items-center">
          <PrimaryLogo />
        </View>
        <View style={styles.container}>
          <View className="mb-5 w-full flex-1 border border-e-primary">
            <Image
              className="h-64 w-full overflow-hidden rounded-t-xl"
              contentFit="cover"
              source={{
                uri: require("../../assets/onboarding-image-01.png"),
                height: 256,
              }}
            />
          </View>
          <View style={styles.main}>
            <View className="flex-1 items-center justify-center gap-6">
              <Text style={styles.title}>Welcome word wizard!</Text>
              <Text style={styles.subtitle}>
                Get ready to embark on a fun and challenging word
                adventure.Enhance your vocabulary and sharpeen your mind with
                our engaging puzzles!
              </Text>
            </View>
            <View className="max-h-12 flex-1 flex-row items-center gap-1">
              <Ionicons
                name="ellipse"
                size={8}
                color={"#4b5563"}
                className="fill-gray-600"
              />
              <Ionicons name="ellipse" size={8} color={"#9ca3af"} />
              <Ionicons name="ellipse" size={8} color={"#9ca3af"} />
              <Ionicons name="ellipse" size={8} color={"#9ca3af"} />
            </View>
          </View>
        </View>
        <View className="flex w-full flex-row items-center gap-2">
          <Link href={"/onboarding"} className="basis-auto" asChild>
            <Button label="Skip" radius="full" variant="outline" />
          </Link>
          <Link href={"/get-started"} className="flex-1" asChild>
            <Button label="Get started!" radius="full" />
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 24,
  },
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "auto",
    gap: 8,
    //borderWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 21,
    color: "#38434D",
    textAlign: "center",
  },
});
