class Node {
  value: string | null;
  children: { [key: string]: Node };
  endOfWord: boolean;

  constructor(value: string | null) {
    this.value = value;
    this.children = {};
    this.endOfWord = false;
  }
}

class Dictionary {
  root: Node;

  constructor() {
    this.root = new Node(null);
  }

  insert(word: string) {
    let current = this.root;

    for (const char of word) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (current.children[char] === undefined) {
        current.children[char] = new Node(char);
      }

      current = current.children[char];
    }

    current.endOfWord = true;
  }

  search(word: string) {
    let current = this.root;

    for (const char of word) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (current.children[char] === undefined) {
        return false;
      }

      current = current.children[char];
    }

    return current.endOfWord;
  }

  getSuggestions(word: string) {
    let current = this.root;
    let correctWord = '';

    if (word.length === 0 || /\s+/.test(word)) {
      return [];
    }

    for (const char of word) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (current.children[char] === undefined) {
        break;
      }

      correctWord += char;
      current = current.children[char];
    }

    return this.findCorrelatedWords(current, correctWord);
  }

  findCorrelatedWords(node: Node, prefix: string, words: string[] = [], level = 1) {
    const children = Object.values(node.children);
    const numberOfChildren = children.length;

    if (level === 1) {
      prefix = prefix.slice(0, -1);
    }

    prefix += node.value;

    if (node.endOfWord) {
      words.push(prefix);
    }

    if (numberOfChildren === 0) {
      return words;
    }

    for (const childNode of children) {
      this.findCorrelatedWords(childNode, prefix, words, level + 1);
    }

    return words;
  }
}

const dictionary = new Dictionary();

export default dictionary;
