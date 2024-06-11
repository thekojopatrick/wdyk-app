import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { Button, ThemedText } from "@/ui";
import { CheckMailIcon, LockIcon, PrimaryLogo } from "@/ui/icons";
import Ionicons from "@expo/vector-icons/Ionicons";

const PasswordChanged = () => {
  const router = useRouter();
  return (
    <SafeAreaView>
      <View className="h-full w-full p-4 pb-2">
        <View className="mb-4 w-full flex-row items-center justify-center">
          <Button
            variant="secondary"
            size="icon"
            className="hidden h-10 w-10 p-2"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={16} />
          </Button>
          <PrimaryLogo />
        </View>
        <View className="mx-auto mb-5 mt-auto h-full max-h-[960px] w-full justify-center ">
          <View className="items-center justify-center gap-2 px-6 text-center">
            <View className="h-16 w-16 items-center justify-center rounded-full bg-purple-50">
              <LockIcon />
            </View>
            <ThemedText
              variant="title3"
              testID="form-title"
              className="text-center font-semibold"
            >
              Your new password has been saved!
            </ThemedText>
            <ThemedText
              variant="footnote"
              testID="form-description"
              className="text-center"
            >
              You can now log in using your new password.
            </ThemedText>
          </View>
          <View className="my-10 w-full">
            <Link href={"(auth)/login"} asChild>
              <Button label="Continue to login" className="w-full" />
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PasswordChanged;

const styles = StyleSheet.create({});
