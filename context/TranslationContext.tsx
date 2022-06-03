import React, { useCallback, useContext, useEffect } from 'react';

import rules from '@Config/rules';
import warehouse from '@Config/warehouse';

interface TranslationContextType {
  translate: (text: string) => string;
}

const TranslationContext = React.createContext<TranslationContextType>({
  translate: (text: string) => {
    return text;
  },
});

export const useTranslation = () => useContext(TranslationContext);

interface TranslationContextProviderProps {
  children: React.ReactNode;
}

const loadRules = () => {
  for (const key in rules.vowels) {
    warehouse.insert(key);
  }

  for (const key in rules.helpers) {
    warehouse.insert(key);
  }

  for (const key in rules.consonants) {
    warehouse.insert(key);
  }

  for (const key in rules.conjunctions) {
    warehouse.insert(key);
  }

  for (const key in rules.kar) {
    warehouse.insert(key);
  }

  for (const key in rules.numbers) {
    warehouse.insert(key);
  }

  for (const key in rules.specialSymbols) {
    warehouse.insert(key);
  }
};

export const TranslationContextProvider = ({ children }: TranslationContextProviderProps) => {
  useEffect(() => {
    loadRules();
  }, []);

  const translate = useCallback((word: string) => {
    return warehouse.translate(word);
  }, []);

  return <TranslationContext.Provider value={{ translate }}>{children}</TranslationContext.Provider>;
};
