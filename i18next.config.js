import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import general from './assets/locales/en-US/general.json';
import setup from './assets/locales/en-US/setup.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      general,
      setup,
    },
  },
  lng: 'en', // set the initial language
  fallbackLng: 'en', // fallback language if a translation is missing
  interpolation: {
    escapeValue: false, // if you want to include HTML tags in your translations
  },
  defaultNS: 'general',
  ns: ['general', 'setup'],
});

export default i18n;
