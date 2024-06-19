import { ClientEnv, Env } from "./env";
import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Env.NAME,
  description: `${Env.NAME} Mobile App`,
  owner: Env.EXPO_ACCOUNT_OWNER,
  scheme: Env.SCHEME,
  slug: "wdyk",
  version: Env.VERSION.toString(),
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "cover",
    backgroundColor: "#6229FF",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: Env.BUNDLE_ID,
  },
  android: {
    package: Env.PACKAGE,
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#2E3C4B",
    },
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: [
    "expo-font",
    "expo-localization",
    "expo-router",
    "react-native-email-link",
    [
      "app-icon-badge",
      {
        enabled: Env.APP_ENV !== "production",
        badges: [
          {
            text: Env.APP_ENV,
            type: "banner",
            color: "white",
          },
          {
            text: Env.VERSION.toString(),
            type: "ribbon",
            color: "white",
          },
        ],
      },
    ],
  ],

  extra: {
    ...ClientEnv,

    eas: {
      projectId: Env.EAS_PROJECT_ID,
    },
    updates: {
      url: "https://u.expo.dev/c594ea6d-dec7-4777-923c-f2dcd026e2ac",
    },
    runtimeVersion: {
      policy: "appVersion",
    },
  },
});
