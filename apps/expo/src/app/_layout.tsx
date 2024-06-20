import "@bacons/text-decoder/install";
import "../styles.css";

import { StyleSheet } from "react-native";
import FlashMessage from "react-native-flash-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { APIProvider } from "@/api";
import AuthProvider from "@/core/providers/AuthProvider";
import { useThemeConfig } from "@/core/use-theme-config";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ThemeProvider } from "@react-navigation/native";

// This is the main layout of the app
// It wraps your pages with the providers they need
export const unstable_settings = {
  initialRouteName: "splash",
};

export default function RootLayout() {
  return (
    <Providers>
      <Stack initialRouteName="splash">
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="account" options={{ headerShown: false }} />
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
      className={theme.dark ? `dark` : undefined}
    >
      <ThemeProvider value={theme}>
        <AuthProvider>
          <APIProvider>
            <BottomSheetModalProvider>
              {children}
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
