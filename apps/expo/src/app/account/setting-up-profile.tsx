import type { SettingUpAccountFormProps } from "@/components/auth/SettingUpAccountForm";
import type { SettingUpProfileFormProps } from "@/components/auth/SettingUpProfileForm";
import type { Profile } from "@/types";
import React, { useState } from "react";
import { ActivityIndicator, Alert, AppState } from "react-native";
import { showMessage } from "react-native-flash-message";
import { Redirect, useRouter } from "expo-router";
import { SettingAccountForm, SettingUpProfileForm } from "@/components/auth";
import { useAuth } from "@/core/providers";
import { Button, SafeAreaView, Text, View } from "@/ui";
import { PrimaryLogo } from "@/ui/icons";
import { supabase } from "@/utils/supabase";
import Ionicons from "@expo/vector-icons/Ionicons";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    void supabase.auth.startAutoRefresh();
  } else {
    void supabase.auth.stopAutoRefresh();
  }
});

const SettingUpProfile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { session, setProfile, userName } = useAuth();
  const [currentForm, setCurrentForm] = useState<number>(1);
  const [formData, setFormData] = useState({});

  if (userName) {
    return <Redirect href={"/(tabs)/home"} />;
  }

  const handleNext = () => {
    setCurrentForm(currentForm + 1);
  };

  const handleOnSubmit = async () => {
    console.log({ formData });
    try {
      setLoading(true);
      const updates = {
        id: session?.user.id,
        ...formData,
        updated_at: new Date(),
      };
      const { data, error } = await supabase
        .from("profiles")
        .upsert(updates)
        .eq("id", session?.user.id)
        .select()
        .single<Profile>();

      if (error) {
        showMessage({
          message: "Profile updated successfully",
          type: "danger",
        });
        console.error("Error updating profile:", error);
      } else {
        showMessage({
          message: "Profile updated successfully",
          type: "success",
        });

        // const profile = data;
        // setUserName(profile.username);

        setProfile(data);

        console.log("Profile updated successfully:", data);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);

      router.replace("/(tabs)/");
    }
  };

  const onFirstFormSubmit: SettingUpProfileFormProps["onSubmit"] = (data) => {
    handleNext();
    console.log("First Form Data:", data);
    setFormData((prevData) => ({ ...prevData, ...data }));
  };

  const onSecondFormSubmit: SettingUpAccountFormProps["onSubmit"] = async (
    data,
  ) => {
    setFormData((prevData) => ({ ...prevData, ...data }));

    console.log("Second Form Data:", data);
    if (formData !== "") {
      await handleOnSubmit();
    }
  };

  if (loading) {
    <View className="h-full w-full items-center justify-center bg-current">
      <ActivityIndicator size="large" />
      <Text className="mt-4 text-center text-white">
        Setting up your account
      </Text>
    </View>;
  }

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
          <>
            <SettingAccountForm onSubmit={onSecondFormSubmit} />
            <View className="mt-auto hidden w-full text-center">
              <Button label="Save and continue" onPress={handleOnSubmit} />
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SettingUpProfile;
