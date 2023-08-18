import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import Language from "./Constant/Language";

import parseTranslations from './Translations/Parser'
import English from './Translations/en';
import French from './Translations/fr';

const resources = {
  en: {
    translation: parseTranslations(English),
  },
  fr: {
    translation: parseTranslations(French),
  },
};

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || Language.DEFAULT.code,
    supportedLngs: ["fr", "en"],
    fallbackLng: Language.DEFAULT.code,
    interpolation: {
      escapeValue: false,
    },
  });
export default i18next;