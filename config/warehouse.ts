import rules from '@Config/rules';
import { isAssociateWithVowels, isTranslatable } from '@Utils/utils';

class Node {
  value: string | null;
  children: { [key: string]: Node };
  endOfSequence: boolean;
  bengali: string;
  kar: string;
  isVowel: boolean;

  constructor(value: string | null) {
    this.value = value;
    this.children = {};
    this.endOfSequence = false;
    this.isVowel = false;
    this.bengali = '';
    this.kar = '';
  }
}

class WarehouseTrie {
  root: Node;
  sequences: string[];
  temp: string;

  constructor() {
    this.root = new Node(null);
    this.sequences = [];
    this.temp = '';
  }

  insert(word: string) {
    let current = this.root;

    let prefix = '';

    for (const char of word) {
      prefix += char;

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (current.children[char] === undefined) {
        current.children[char] = new Node(char);
      }

      if (rules.vowels.hasOwnProperty(prefix)) {
        current.children[char].bengali = rules.vowels[prefix];
        current.children[char].kar = rules.kar[prefix];
        current.children[char].isVowel = true;
      }

      if (rules.helpers.hasOwnProperty(prefix)) {
        current.children[char].bengali = rules.helpers[prefix];
      }

      if (rules.consonants.hasOwnProperty(prefix)) {
        current.children[char].bengali = rules.consonants[prefix];
      }

      if (rules.conjunctions.hasOwnProperty(prefix)) {
        current.children[char].bengali = rules.conjunctions[prefix];
      }

      if (rules.numbers.hasOwnProperty(prefix)) {
        current.children[char].bengali = rules.numbers[prefix];
      }

      if (rules.specialSymbols.hasOwnProperty(prefix)) {
        current.children[char].bengali = rules.specialSymbols[prefix];
      }

      current = current.children[char];
    }

    current.endOfSequence = true;
  }

  translate(word: string) {
    const branches: string[] = [];

    const takeBengaliValue = (node: Node) => {
      if (node.isVowel) {
        if (!branches.length) {
          return node.bengali;
        }

        if (isAssociateWithVowels(branches[branches.length - 1])) {
          return node.bengali;
        }

        return node.kar;
      }
      return node.bengali;
    };

    const parse = (word: string) => {
      let current = this.root;

      if (!word) {
        return;
      }

      let pointer = 0,
        consecutivePick = 0;

      for (const char of word) {
        pointer++;

        if (!isTranslatable(char)) {
          consecutivePick = 0;
          branches.push(char);
          continue;
        }

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (current.children[char] === undefined) {
          branches.push(takeBengaliValue(current));
          parse(word.slice(Math.max(consecutivePick, 1)));
          break;
        } else {
          current = current.children[char];
          consecutivePick++;

          if (pointer === word.length) {
            branches.push(takeBengaliValue(current));
          }
        }
      }
    };

    const makeWordFromBranches = (word: string) => {
      parse(word);
      const result = branches.join('');

      return result;
    };

    return makeWordFromBranches(word);
  }
}

const warehouse = new WarehouseTrie();

export default warehouse;
