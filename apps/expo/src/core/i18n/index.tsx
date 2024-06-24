import { I18nManager } from "react-native";
// import { locale } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { resources } from "./resources";
import { getLanguage } from "./utils";

export * from "./utils";

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getLanguage() ?? "en",
    fallbackLng: "en",
    compatibilityJSON: "v3",

    interpolation: {
      escapeValue: false,
    },
  })
  .catch((err) => {
    console.error("Failed to initialize i18n", err);
  });

// Is it a RTL language?
export const isRTL: boolean = i18n.dir() === "rtl";

I18nManager.allowRTL(isRTL);
I18nManager.forceRTL(isRTL);

export default i18n;
