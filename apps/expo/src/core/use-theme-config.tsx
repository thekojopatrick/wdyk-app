import {
  DefaultTheme,
  DarkTheme as _DarkTheme,
} from "@react-navigation/native";

import type { Theme } from "@react-navigation/native";
import colors from "@/theme/colors";
import { useColorScheme } from "nativewind";

const DarkTheme: Theme = {
  ..._DarkTheme,
  colors: {
    ..._DarkTheme.colors,
    primary: colors.primary[400],
    background: colors.charcoal[850],
    text: colors.charcoal[100],
    border: colors.charcoal[500],
    card: colors.charcoal[850],
  },
};

const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary[600],
    background: colors.white,
  },
};

export function useThemeConfig() {
  const { colorScheme } = useColorScheme();

  if (colorScheme === "dark") return DarkTheme;

  return LightTheme;
}
