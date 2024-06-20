import React from "react";
import { StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";
import { useIsFirstTime } from "@/core/hooks";
import { Button, Image, SafeAreaView, Text, View } from "@/ui";
import { PrimaryLogo } from "@/ui/icons";
import { Ionicons } from "@expo/vector-icons";

const Onboarding = () => {
  const [_, setIsFirstTime] = useIsFirstTime();
  const router = useRouter();

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
          <Button
            label="Skip"
            radius="full"
            variant="outline"
            className="basis-auto"
            onPress={() => {
              setIsFirstTime(false);
              router.replace("/signup");
            }}
          />
          <Button
            label="Let's get started!"
            className="flex-1"
            onPress={() => {
              setIsFirstTime(false);
              router.replace("/signup");
            }}
          />
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
    paddingHorizontal: 24,
    paddingTop: 0,
    paddingBottom: 16,
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
    //color: "#38434D",
    textAlign: "center",
  },
  image: {
    flex: 1,
    width: "100%",
  },
});
