import React from "react";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { SettingUpProfileForm } from "@/components/auth";
import { Button, SafeAreaView, View } from "@/ui";
import { PrimaryLogo } from "@/ui/icons";
import Ionicons from "@expo/vector-icons/Ionicons";

const SettingUpProfile = () => {
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
        <SettingUpProfileForm />
      </View>
    </SafeAreaView>
  );
};

export default SettingUpProfile;

const styles = StyleSheet.create({});
