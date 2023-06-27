import i18n from 'i18next';
import Backend from 'i18next-fs-backend';
import { initReactI18next } from 'react-i18next';
import enTranslation from './public/locales/en.json';
import jaTranslation from './public/locales/ja.json';
import path from 'path';

const isServer = typeof window === 'undefined';

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: ['en', 'ja'],
    resources: isServer ? {} : {
      en: { translation: enTranslation },
      ja: { translation: jaTranslation },
    },
    backend: isServer ? {
      loadPath: path.join(__dirname, '/public/locales/{{lng}}.json'),
    } : {},
  });

if (isServer) {
  i18n.use(Backend);
}

export default i18n;