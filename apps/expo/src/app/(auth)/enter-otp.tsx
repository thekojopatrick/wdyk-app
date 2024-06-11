import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { GoogleAuthButton, LoginForm } from "@/components/auth";
import { EnterOtpForm } from "@/components/auth/otp";
import { Button } from "@/ui";
import { PrimaryLogo } from "@/ui/icons";
import Ionicons from "@expo/vector-icons/Ionicons";

const EnterOtp = () => {
  const router = useRouter();
  return (
    <SafeAreaView>
      <View className="h-full w-full p-4 pb-2">
        <View className="mb-4 w-full flex-row items-center justify-between">
          <Button
            variant="secondary"
            size="icon"
            className="h-10 w-10 p-2"
            onPress={() => router.push("/(auth)/forgot-password")}
          >
            <Ionicons name="arrow-back" size={16} />
          </Button>
          <PrimaryLogo />
        </View>
        <EnterOtpForm />
      </View>
    </SafeAreaView>
  );
};

export default EnterOtp;

const styles = StyleSheet.create({});
