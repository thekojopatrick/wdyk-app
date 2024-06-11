import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { GoogleAuthButton, LoginForm } from "@/components/auth";
import { ForgotPasswordForm } from "@/components/auth/reset-password";
import { Button } from "@/ui";
import { PrimaryLogo } from "@/ui/icons";
import Ionicons from "@expo/vector-icons/Ionicons";

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
