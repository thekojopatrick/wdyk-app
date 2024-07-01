import "@bacons/text-decoder/install";
import "../styles.css";

import { useEffect } from "react";
import { StyleSheet } from "react-native";
import FlashMessage from "react-native-flash-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { APIProvider } from "@/api";
import AuthProvider from "@/core/providers/AuthProvider";
import { useThemeConfig } from "@/core/use-theme-config";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ThemeProvider } from "@react-navigation/native";

// This is the main layout of the app
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";
// It wraps your pages with the providers they need

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "splash",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const screens = [
  { name: "splash", options: { headerShown: false } },
  { name: "index", options: { headerShown: false } },
  { name: "(auth)", options: { headerShown: false } },
  { name: "(tabs)", options: { headerShown: false } },
  { name: "onboarding", options: { headerShown: false } },
  { name: "account", options: { headerShown: false } },
];

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter: require("../../assets/fonts/Inter.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Providers>
      <Stack initialRouteName="splash">
        {screens.map((screen) => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            options={screen.options}
          />
        ))}
      </Stack>
      <StatusBar />
    </Providers>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  const theme = useThemeConfig();
  return (
    <GestureHandlerRootView
      style={styles.container}
      className={theme.dark ? `light` : undefined}
    >
      <ThemeProvider value={theme}>
        <AuthProvider>
          <APIProvider>
            <BottomSheetModalProvider>
              {children}
              {/* <Slot /> */}
              <FlashMessage position="top" />
            </BottomSheetModalProvider>
          </APIProvider>
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
