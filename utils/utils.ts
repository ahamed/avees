import rules from '@Config/rules';

// eslint-disable-next-line prettier/prettier
export const noop = () => { };

export const uppercaseFirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const isVowel = (char: string) => {
  return rules.vowels.hasOwnProperty(char);
};

export const isAssociateWithVowels = (bengali: string) => {
  const vowels = [...Object.values(rules.vowels), ...Object.values(rules.kar)];
  return vowels.includes(bengali);
};

export const isBengaliChar = (char: string) => {
  return [
    ...Object.values(rules.vowels),
    ...Object.values(rules.helpers),
    ...Object.values(rules.consonants),
    ...Object.values(rules.kar),
    ...Object.values(rules.numbers),
    ...Object.values(rules.specialSymbols),
  ].includes(char);
};

const translatableSymbols = '$.:()[]{}!@#%^&*-+=|\\/<>?~`;,';
export const isLetter = (char: string) => /[a-zA-Z]/.test(char);
export const isDigit = (char: string) => /[0-9]/.test(char);
export const isTranslatable = (char: string) => isLetter(char) || isDigit(char) || translatableSymbols.includes(char);
export const isTranslatableWord = (word: string) => {
  return word.split('').every((char) => isTranslatable(char));
};
export const isDefined = <T>(value: T): value is NonNullable<T> => {
  return value !== undefined && value !== null;
};

export const exchangeCharacterCase = (char: string) => {
  if (!isLetter(char)) {
    return char;
  }

  if (char.toLowerCase() === char) {
    return char.toUpperCase();
  }

  return char.toLowerCase();
};

export const placeCaretAtEnd = <T extends HTMLElement>(el: T) => {
  el.focus();

  if (typeof window.getSelection !== 'undefined' && typeof document.createRange !== 'undefined') {
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  }
};
