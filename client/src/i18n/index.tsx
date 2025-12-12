import i18n, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import ar from "./locales/ar.json";

interface Resources {
  [key: string]: { translation: Record<string, string> };
}

const resources: Resources = {
  en: { translation: en },
  ar: { translation: ar },
};

const options: InitOptions = {
  resources,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(options);

export default i18n;
