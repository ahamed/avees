import { Translations } from '@Hooks/useTranslation';

export type SlotKeysExtractor<Path extends string> = Path extends `{{${infer Param}}}${infer Rest}`
  ? Param | SlotKeysExtractor<Rest>
  : Path extends `${infer _Prefix}{{${infer Rest}`
  ? SlotKeysExtractor<`{{${Rest}`>
  : never;

export type SlotTagsExtractor<Path extends string> = Path extends `</${infer Param}>${infer Rest}`
  ? Param | SlotTagsExtractor<Rest>
  : Path extends `${infer _Prefix}</${infer Rest}`
  ? SlotTagsExtractor<`</${Rest}`>
  : never;

export type TranslationOptions<Keys extends string | never> = [Keys] extends [never]
  ? [undefined?]
  : [{ [key in Keys]: string | number }];

export type Translator = <Key extends keyof Translations>(
  key: Key,
  ...[options]: TranslationOptions<SlotKeysExtractor<Translations[Key]>>
) => string;
