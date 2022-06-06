import { useCallback } from 'react';
import { useTranslation as use18nextTranslation } from 'react-i18next';

// import BnTranslations from '@Utils/translations/bn';
import EnTranslations from '@Utils/translations/en';
import { SlotKeysExtractor, TranslationOptions } from '@Utils/types';

export type Translations = typeof EnTranslations;

export const useTranslation = () => {
  const { t } = use18nextTranslation();
  const translate = useCallback(
    <Key extends keyof Translations>(
      key: Key,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ...[options]: TranslationOptions<SlotKeysExtractor<Translations[Key]>>
    ): string => {
      return t(key, options);
    },
    [t],
  );

  return translate;
};
