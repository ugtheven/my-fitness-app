import * as Localization from 'expo-localization';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enAuth from './locales/en/auth';
import enHome from './locales/en/home';
import frAuth from './locales/fr/auth';
import frHome from './locales/fr/home';

const resources = {
  en: { auth: enAuth, home: enHome },
  fr: { auth: frAuth, home: frHome },
};

const supported = ['en', 'fr'];
const deviceLang = Localization.getLocales()[0]?.languageCode ?? 'en';
const lng = supported.includes(deviceLang) ? deviceLang : 'en';

i18next.use(initReactI18next).init({
  resources,
  lng,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18next;
