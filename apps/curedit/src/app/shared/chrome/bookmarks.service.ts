import { URL } from 'url';

import { Injectable } from '@angular/core';
import { Observable, bindCallback, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {
  BookTreeChrome,
  BookmarkGridEntry,
  BookmarkTree
} from '../../typings/bookmarks';
import { DataGridTree } from '../../typings/nebular';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {
  constructor() {}

  private readonly isFolder = (node: BookTreeChrome) => !node.url;

  mapTreesToGridTrees(
    trees: BookmarkTree[]
  ): DataGridTree<BookmarkGridEntry>[] {
    return trees.map(tree => {
      const template = new DataGridTree<BookmarkGridEntry>();
      template.data = {
        title: tree.title,
        modified: new Date(tree.dateGroupModified || tree.dateAdded),
        size: tree.children ? tree.children.size : '-',
        actions: new BookmarkGridEntry().actions,
        kind: tree.kind,
        url: tree.url
      };
      if (tree.children && tree.children.size > 0) {
        template.children.push(...this.mapTreesToGridTrees([...tree.children]));
      }
      return template;
    });
  }

  private getBookmarkFolders(nodes: BookTreeChrome[]): Set<BookmarkTree> {
    const bookFolders = new Set<BookmarkTree>();

    const getChildren = (childNodes: BookTreeChrome[]) => {
      childNodes.forEach(node => {
        const {
          id,
          title,
          children,
          parentId,
          dateAdded,
          dateGroupModified
        } = node;
        const addable = {
          id,
          title,
          parentId,
          dateAdded,
          dateGroupModified
        };
        if (this.isFolder(node)) {
          bookFolders.add({
            ...addable,
            kind: 'folder',
            children:
              children.length > 0
                ? this.getBookmarkFolders(children)
                : new Set()
          });
        } else {
          bookFolders.add({
            ...addable,
            kind: 'url',
            url: node.url
          });
        }
      });
    };

    getChildren(nodes);
    return bookFolders;
  }

  getSubFolders(id: string): Observable<BookmarkTree[]> {
    return this.switchToFolders(bindCallback(chrome.bookmarks.getSubTree)(id));
  }

  getAllFolders(): Observable<BookmarkTree[]> {
    return this.switchToFolders(bindCallback(chrome.bookmarks.getTree)());
  }

  private switchToFolders(
    obs: Observable<BookTreeChrome[]>
  ): Observable<BookmarkTree[]> {
    const bookFolders: BookmarkTree[] = [];
    return obs.pipe(
      switchMap((results: BookTreeChrome[]) => {
        bookFolders.push(
          ...this.getBookmarkFolders(
            // skip root folder i.e. folder without parentId
            results[0].parentId ? results : results[0].children
          )
        );
        return of(bookFolders);
      })
    );
  }
}
