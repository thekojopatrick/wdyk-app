import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { Button } from "@/ui";
import { SecondaryLogo } from "@/ui/icons";

const Splash = () => {
  return (
    <>
      <View className="h-full w-full bg-primary p-4">
        <View style={styles.container}>
          <View style={styles.main}>
            <SecondaryLogo />
          </View>
        </View>
        <Link href={"/onboarding"} asChild>
          <Button label="What do you know?" />
        </Link>
      </View>
    </>
  );
};

export default Splash;

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
