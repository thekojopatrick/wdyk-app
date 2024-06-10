import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
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
          <View className="mb-5 aspect-square h-[420px] w-full overflow-hidden">
            <Image
              className="h-full w-full rounded-t-xl"
              style={styles.image}
              contentFit="contain"
              source={require("../../assets/onboarding-image-01.png")}
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
          <Link href={"/(auth)/signup"} className="w-full" asChild>
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
    paddingHorizontal: 24,
    paddingTop: 0,
    paddingBottom: 16,
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
  image: {
    flex: 1,
    width: "100%",
  },
});