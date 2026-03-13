import * as Localization from 'expo-localization';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enActivities from './locales/en/activities';
import enAuth from './locales/en/auth';
import enHome from './locales/en/home';
import enNav from './locales/en/nav';
import enNutrition from './locales/en/nutrition';
import enProfile from './locales/en/profile';
import enPrograms from './locales/en/programs';
import frActivities from './locales/fr/activities';
import frAuth from './locales/fr/auth';
import frHome from './locales/fr/home';
import frNav from './locales/fr/nav';
import frNutrition from './locales/fr/nutrition';
import frProfile from './locales/fr/profile';
import frPrograms from './locales/fr/programs';

const resources = {
  en: {
    activities: enActivities,
    auth: enAuth,
    home: enHome,
    nav: enNav,
    nutrition: enNutrition,
    profile: enProfile,
    programs: enPrograms,
  },
  fr: {
    activities: frActivities,
    auth: frAuth,
    home: frHome,
    nav: frNav,
    nutrition: frNutrition,
    profile: frProfile,
    programs: frPrograms,
  },
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
