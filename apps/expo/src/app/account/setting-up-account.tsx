import React from "react";
import { useRouter } from "expo-router";
import { ActivityIndicator, Button, Text, View } from "@/ui";
import { PrimaryLogo } from "@/ui/icons";
import Ionicons from "@expo/vector-icons/Ionicons";

const SettingUpAccount = () => {
  const router = useRouter();
  return (
    <>
      <View className="h-full w-full bg-primary p-4 pb-2">
        <View className="mb-4 hidden w-full flex-row items-center justify-between">
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
        <View className="h-full w-full items-center justify-center bg-current">
          <ActivityIndicator size="large" />
          <Text className="mt-4 text-center text-white">
            Setting up your account
          </Text>
        </View>
      </View>
    </>
  );
};

export default SettingUpAccount;
