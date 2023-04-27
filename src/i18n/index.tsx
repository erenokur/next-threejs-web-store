import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

if (!i18n.isInitialized) {
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      lng: "en",
      fallbackLng: "en",
      debug: true,
      detection: {
        order: ["cookie", "navigator"],
        caches: ["cookie"],
      },
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
      },
      missingKeyHandler: function (lngs, namespace, key, fallbackValue) {
        console.warn(`Missing Translation Key ${key}`);
      },
    });
}

export default i18n;
