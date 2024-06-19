import type { Config } from "tailwindcss";
// @ts-expect-error - no types
import nativewind from "nativewind/preset";

import baseConfig from "@acme/tailwind-config/native";

const colors = require("./src/theme/colors");

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [baseConfig, nativewind],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter"],
      },
      colors,
    },
  },
} satisfies Config;
