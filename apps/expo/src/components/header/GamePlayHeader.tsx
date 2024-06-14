import { AntDesign, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { Button, ThemedText } from "@/ui";
import { NotificationIcon, Settings as SettingsIcon } from "@/ui/icons";
import { Platform, StatusBar, StyleSheet, View } from "react-native";

import Constants from "expo-constants";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/theme";
import { useRouter } from "expo-router";

interface GamePlayHeaderProps {
  title?: string;
  titleVariant?: "largeTitle" | "title1" | "title2";
  children?: React.ReactNode;
}

const GamePlayHeader: React.FC<GamePlayHeaderProps> = ({ title, children }) => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Button
          size="icon"
          style={{ backgroundColor: colors.secondary[200] }}
          className="h-8 w-8 p-2"
          onPress={() => router.back()}
        >
          <AntDesign name="close" size={16} color="black" />
        </Button>
        <ThemedText
          variant={"title3"}
          className="font-semibold uppercase text-white"
        >
          {title}
        </ThemedText>
        <View className="flex flex-row items-center gap-2">
          <SimpleLineIcons
            name="clock"
            size={16}
            color={colors.secondary[200]}
          />
          <ThemedText
            variant="footnote"
            style={{ color: colors.secondary[200] }}
            className="font-bold"
          >
            2:00
          </ThemedText>
        </View>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default GamePlayHeader;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary[600],
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flexDirection: "row",
    height: Constants.statusBarHeight,
    gap: 20,
    backgroundColor: colors.primary[600],
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});
