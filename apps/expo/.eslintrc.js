import baseConfig from "@acme/eslint-config/base";
import expoConfig from "@acme/eslint-config/expo";
import reactConfig from "@acme/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".expo/**", "expo-plugins/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...expoConfig,
];
