import React, { useCallback, useContext } from 'react';

import LoadingSpinner from '@Components/Loaders/LoadingSpinner';
import dictionary from '@Config/dictionary';
import { RuleSet } from '@Config/rules';
import warehouse from '@Config/warehouse';
import { useDictionaryDatasetQuery, useTranslationRulesQuery } from 'services/dataset';

interface TranslationContextType {
  translate: (text: string) => string;
}

const TranslationContext = React.createContext<TranslationContextType>({
  translate: (text: string) => {
    return text;
  },
});

export const useTranslationToBengali = () => useContext(TranslationContext);

interface TranslationContextProviderProps {
  children: React.ReactNode;
}

const createRuleSetTrie = (rules: RuleSet) => {
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

const createDictionaryTrie = (dataset: string[]) => {
  for (const word of dataset) {
    dictionary.insert(word);
  }
};

export const TranslationContextProvider = ({ children }: TranslationContextProviderProps) => {
  const dictionaryDatasetQuery = useDictionaryDatasetQuery();
  const translationRulesQuery = useTranslationRulesQuery();

  const translate = useCallback((word: string) => {
    return warehouse.translate(word);
  }, []);

  if (dictionaryDatasetQuery.isLoading || translationRulesQuery.isLoading) {
    return <LoadingSpinner title="Initializing..." />;
  }

  if (!dictionaryDatasetQuery.data || !translationRulesQuery.data) {
    return <div>Unable to load critical data!</div>;
  }

  createRuleSetTrie(translationRulesQuery.data);
  createDictionaryTrie(dictionaryDatasetQuery.data);

  return <TranslationContext.Provider value={{ translate }}>{children}</TranslationContext.Provider>;
};
