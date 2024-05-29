import * as React from "react";
import { StatusBar } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useColorScheme } from "nativewind";

type Props = React.ComponentProps<typeof StatusBar>;
export const FocusAwareStatusBar = (props: Props) => {
  const isFocused = useIsFocused();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const barStyle = isDark ? "light-content" : "dark-content";

  return isFocused ? <StatusBar barStyle={barStyle} {...props} /> : null;
};
