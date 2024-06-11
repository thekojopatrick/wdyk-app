import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import CustomHeader from "@/components/header/CustomHeader";
import { ProfileContainer } from "@/components/profile";
import { Item } from "@/components/settings/item";
import { ItemsContainer } from "@/components/settings/items-container";
import { colors } from "@/theme";
import { FocusAwareStatusBar } from "@/ui";
import {
  NotificationIcon,
  Rate,
  Share,
  Style as StyleIcon,
  Support,
  UserSettings as UserSettingsIcon,
} from "@/ui/icons";
import { useColorScheme } from "nativewind";

const Profile = () => {
  const { colorScheme } = useColorScheme();
  const iconColor =
    colorScheme === "dark" ? colors.neutral[400] : colors.neutral[500];
  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar />
      <Stack.Screen
        options={{
          header: () => (
            <CustomHeader title="Profile" titleVariant="largeTitle" />
          ),
        }}
      />
      <>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 40 }}
          className="h-full w-full px-5"
        >
          <View className="">
            <ProfileContainer />
            <ItemsContainer title="settings.account">
              <Item
                text="settings.account_settings"
                icon={<UserSettingsIcon color={iconColor} />}
                onPress={() => {}}
              />
            </ItemsContainer>

            <ItemsContainer title="settings.preferences">
              <Item
                text="settings.appearance"
                icon={<StyleIcon color={iconColor} />}
                onPress={() => {}}
              />
              <Item
                text="settings.notifications"
                icon={<NotificationIcon color={iconColor} />}
                onPress={() => {}}
              />
            </ItemsContainer>
            <ItemsContainer title="settings.about">
              <Item
                text="settings.share"
                icon={<Share color={iconColor} />}
                onPress={() => {}}
              />
              <Item
                text="settings.rate"
                icon={<Rate color={iconColor} />}
                onPress={() => {}}
              />
              <Item
                text="settings.support"
                icon={<Support color={iconColor} />}
                onPress={() => {}}
              />
            </ItemsContainer>

            <ItemsContainer title="settings.legal">
              <Item
                text="settings.privacy"
                icon={<Share color={iconColor} />}
                onPress={() => {}}
              />
              <Item
                text="settings.terms"
                icon={<Rate color={iconColor} />}
                onPress={() => {}}
              />
            </ItemsContainer>
          </View>
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    top: 40,
    flex: 1,
  },
});
