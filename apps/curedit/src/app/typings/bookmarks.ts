export type BookTreeChrome = chrome.bookmarks.BookmarkTreeNode;
export type Kind = 'folder' | 'url';

export interface BookmarkTree {
  id: string;
  url?: string;
  title: string;
  parentId?: string;
  dateAdded: number;
  kind: Kind;
  dateGroupModified?: number;
  children?: Set<BookmarkTree>;
}

export class BookmarkGridEntry {
  actions: string[] = ['Edit', 'Remove'];

  constructor();
  constructor(
    public title?: string,
    public size?: number | '-',
    public modified?: Date,
    public kind?: Kind,
    public url?: string
  ) {}
}
