import { GoogleAuthButton, LoginForm } from "@/components/auth";
import { Link, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "@/ui";
import { ForgotPasswordForm } from "@/components/auth/reset-password";
import Ionicons from "@expo/vector-icons/Ionicons";
import { PrimaryLogo } from "@/ui/icons";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ForgotPassword = () => {
  const router = useRouter();
  return (
    <SafeAreaView>
      <View className="h-full w-full p-4 pb-2">
        <View className="mb-4 w-full flex-row items-center justify-between">
          <Button
            variant="secondary"
            size="icon"
            className="h-10 w-10 p-2"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={16} />
          </Button>
          <PrimaryLogo />
        </View>
        <ForgotPasswordForm />
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
