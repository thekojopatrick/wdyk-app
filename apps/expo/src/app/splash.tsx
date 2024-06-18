import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SecondaryLogo } from "@/ui/icons";

const Splash = () => {
  const router = useRouter();

  const logoAnim = useRef(new Animated.Value(10)).current;
  const textAnim = useRef(new Animated.Value(30)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
      Animated.timing(textAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();

    const timeout = setTimeout(() => {
      router.replace("/");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [logoAnim, textAnim, opacityAnim, router]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          { transform: [{ translateY: logoAnim }] },
        ]}
      >
        <SecondaryLogo />
      </Animated.View>
      <Animated.View
        style={[
          styles.textContainer,
          { transform: [{ translateY: textAnim }], opacity: opacityAnim },
        ]}
      >
        <Text style={styles.appName}>What do you know?</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6229FF",
  },
  logoContainer: {
    marginBottom: 20,
  },
  textContainer: {
    marginTop: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Splash;
