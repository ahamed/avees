import React, { useCallback, useContext, useEffect, useState } from 'react';

import LoadingSpinner from '@Components/Loaders/LoadingSpinner';
import dataset2 from '@Config/dataset-2.json';
import dataset4 from '@Config/dataset-4.json';
import dataset3 from '@Config/dataset-3.json';
import dataset from '@Config/dataset.json';
import dictionary from '@Config/dictionary';
import rules from '@Config/rules';
import warehouse from '@Config/warehouse';

interface TranslationContextType {
  translate: (text: string) => string;
  isLoading: boolean;
}

const TranslationContext = React.createContext<TranslationContextType>({
  translate: (text: string) => {
    return text;
  },
  isLoading: false,
});

export const useTranslationToBengali = () => useContext(TranslationContext);

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

const loadingDictionary = () => {
  return new Promise((resolve) => {
    for (const word of dataset) {
      dictionary.insert(word);
    }

    for (const word of dataset2) {
      dictionary.insert(word);
    }

    for (const word of dataset3) {
      dictionary.insert(word);
    }

    for (const word of dataset4) {
      dictionary.insert(word);
    }

    resolve(true);
  });
};

export const TranslationContextProvider = ({ children }: TranslationContextProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadRules();
    (async () => {
      setIsLoading(true);
      await loadingDictionary();
      setIsLoading(false);
    })();
  }, []);

  const translate = useCallback((word: string) => {
    return warehouse.translate(word);
  }, []);

  return (
    <TranslationContext.Provider value={{ translate, isLoading }}>
      {isLoading && <LoadingSpinner title="Initializing..." />}
      {children}
    </TranslationContext.Provider>
  );
};
