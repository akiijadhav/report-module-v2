import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import enTranslation from './public/locales/en.json'
import jaTranslation from './public/locales/ja.json';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: ['en', 'ja'],
    backend: {
      loadPath: `./public/locales/{{lng}}.json`,
    },
    resources: {
      en: { translation: enTranslation },
      ja: { translation: jaTranslation },
    },
  });

export default i18n;