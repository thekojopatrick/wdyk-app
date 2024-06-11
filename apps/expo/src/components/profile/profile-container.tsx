import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { colors } from "@/theme";
import { ThemedText } from "@/ui";
import { Adinkrahene } from "@/ui/icons/adinkra-symbols";

const ProfileContainer = () => {
  return (
    <View className="flex flex-row items-center gap-3">
      <View
        style={{ backgroundColor: colors.secondary[400] }}
        className="h-20 w-20 items-center justify-center rounded-full"
      >
        <Adinkrahene width={48} height={48} />
      </View>
      <View className="items-start">
        <ThemedText variant="title2" className="mt-2 text-center font-semibold">
          Kojo Patrick
        </ThemedText>
        <Link href={""}>
          <ThemedText variant="body" className="text-center text-neutral-600">
            @kojopatrick
          </ThemedText>
        </Link>
      </View>
    </View>
  );
};

export default ProfileContainer;

const styles = StyleSheet.create({});
