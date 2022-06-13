import { useQuery } from 'react-query';

import { RuleSet } from '@Config/rules';
import { apiInstance } from '@Utils/api';
import { endpoints } from '@Utils/endpoints';

const getDictionaryDataset = () => {
  return apiInstance.get<string[]>(endpoints.DATASET);
};

export const useDictionaryDatasetQuery = () => {
  return useQuery({
    queryKey: ['DictionaryDataset'],
    queryFn: () => getDictionaryDataset().then((res) => res.data),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};

const getTranslationRules = () => {
  return apiInstance.get<RuleSet>(endpoints.TRANSLATION_RULES);
};

export const useTranslationRulesQuery = () => {
  return useQuery({
    queryKey: ['TranslationRules'],
    queryFn: () => getTranslationRules().then((res) => res.data),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};
