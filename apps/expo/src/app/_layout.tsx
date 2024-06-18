import "@bacons/text-decoder/install";
import "../styles.css";

import { APIProvider } from "@/api";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import FlashMessage from "react-native-flash-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { TRPCProvider } from "@/utils/api";
import { ThemeProvider } from "@react-navigation/native";
import useAuth from "@/core/auth";
import { useColorScheme } from "nativewind";
import { useThemeConfig } from "@/core/use-theme-config";

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <Providers>
      {/*
          The Stack component displays the current page.
          It also allows you to configure your screens 
        */}
      <Stack initialRouteName="splash">
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="get-started" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
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
        <APIProvider>
          <BottomSheetModalProvider>
            {children}
            <FlashMessage position="top" />
          </BottomSheetModalProvider>
        </APIProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
