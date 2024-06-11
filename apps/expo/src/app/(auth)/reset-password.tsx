import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { GoogleAuthButton, ResetPasswordForm } from "@/components/auth";
import { Button } from "@/ui";
import { PrimaryLogo } from "@/ui/icons";
import Ionicons from "@expo/vector-icons/Ionicons";

const ResetPassword = () => {
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
        <ResetPasswordForm />
        <View className="mt-auto w-full text-center">
          <View className="flex-row items-center justify-center text-center">
            <Link href={"/support"} asChild>
              <Button variant="link">
                <Text className="pr-2">Need help ? Go to our</Text>
                <Text className="text-primary">Support center</Text>
              </Button>
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({});
