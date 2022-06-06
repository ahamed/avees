import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import BnTranslations from '@Utils/translations/bn';
import EnTranslations from '@Utils/translations/en';
import { SlotKeysExtractor, TranslationOptions } from '@Utils/types';

export enum Language {
  Bengali = 'bn',
  English = 'en',
}

export const getI18nConfig = (defaultLanguage: Language) => {
  i18next.use(initReactI18next).init({
    fallbackLng: Language.Bengali,
    lng: defaultLanguage,
    saveMissing: true,
    resources: {
      en: {
        translation: EnTranslations,
      },
      bn: {
        translation: BnTranslations,
      },
    },
    missingKeyHandler: (_langs, _ns, key) => {
      console.warn(`Missing translation for key: ${key}`);
    },
    interpolation: {
      escapeValue: false,
    },
    missingInterpolationHandler: (key) => {
      console.warn(`Missing interpolation for key: ${key}`);
    },
  });

  return i18next;
};

type Translations = typeof BnTranslations;

export const translate = <Key extends keyof Translations>(
  key: Key,
  ...[options]: TranslationOptions<SlotKeysExtractor<Translations[Key]>>
) => {
  return i18next.t(key, options);
};

export default i18next;
