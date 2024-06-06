import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Button, Image } from "@/ui";
import { PrimaryLogo } from "@/ui/icons";

const GetStarted = () => {
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
            <View className="flex-1 items-center justify-end gap-6">
              <Text style={styles.title}>Welcome word wizard!</Text>
              <Text style={styles.subtitle}>
                Enhance your vocabulary and sharpeen your mind with our engaging
                puzzles!
              </Text>
            </View>
          </View>
        </View>
        <View className="flex w-full flex-col items-center gap-2">
          <Link href={"/onboarding"} className="w-full" asChild>
            <Button label="Create account" radius="full" />
          </Link>
          <Link href={"/(auth)/login"} className="w-full" asChild>
            <Button label="Login" radius="full" variant="link" />
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GetStarted;

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
    marginBottom: 24,
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
