import { Button, SafeAreaView, View } from "@/ui";

import Ionicons from "@expo/vector-icons/Ionicons";
import { PrimaryLogo } from "@/ui/icons";
import React from "react";
import { SettingAccountForm } from "@/components/auth";
import { useRouter } from "expo-router";

const SettingUpAccount = () => {
  const router = useRouter();
  return (
    <SafeAreaView>
      <View className="h-full w-full p-4 pb-2">
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
        <SettingAccountForm />
      </View>
    </SafeAreaView>
  );
};

export default SettingUpAccount;
