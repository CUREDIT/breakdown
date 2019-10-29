export interface ConTree<T> {
  key: string;
  value: T;
  content: Set<ConTree<T>>;
  context: Set<ConTree<T>>;
}

export interface Card {
  type: 'gfm' | 'markdown' | 'asciidoc';
  links: Array<{
    uri: string;
    text: string;
    annotations: Array<string>;
  }>;
}

export type TreeKey = ConTree<Card>;
