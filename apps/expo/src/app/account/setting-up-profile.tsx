import type { SettingUpAccountFormProps } from "@/components/auth/SettingUpAccountForm";
import type { SettingUpProfileFormProps } from "@/components/auth/SettingUpProfileForm";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { SettingAccountForm, SettingUpProfileForm } from "@/components/auth";
import { Button, SafeAreaView, View } from "@/ui";
import { PrimaryLogo } from "@/ui/icons";
import Ionicons from "@expo/vector-icons/Ionicons";

const SettingUpProfile = () => {
  const router = useRouter();
  const [currentForm, setCurrentForm] = useState<number>(1);

  const handleNext = () => {
    setCurrentForm(currentForm + 1);
  };

  // const handleOnSubmit = () => {};

  const onFirstFormSubmit: SettingUpProfileFormProps["onSubmit"] = (data) => {
    console.log(data);
    handleNext();
  };

  const onSecondFormSubmit: SettingUpAccountFormProps["onSubmit"] = (data) => {
    console.log(data);
  };

  return (
    <SafeAreaView>
      <View className="h-full w-full p-4 pb-2">
        <View className="mb-4 hidden w-full flex-row items-center justify-between">
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
        {currentForm === 1 && (
          <SettingUpProfileForm onSubmit={onFirstFormSubmit} />
        )}
        {currentForm === 2 && (
          <SettingAccountForm onSubmit={onSecondFormSubmit} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SettingUpProfile;
