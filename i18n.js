import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './public/locales/en.json';
import jaTranslation from './public/locales/ja.json';

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      en: { 
        translation: enTranslation 
      },
      ja: { 
        translation: jaTranslation 
      }
    },
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    fallbackLng: "en", // use en if detected lng is not available

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;