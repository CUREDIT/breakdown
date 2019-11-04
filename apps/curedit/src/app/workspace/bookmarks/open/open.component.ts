import { Component, OnInit } from '@angular/core';
import {
  NbSortDirection,
  NbSortRequest,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder
} from '@nebular/theme';

import { BookmarksService } from '../../../shared/chrome/bookmarks.service';
import { BookmarkGridEntry, BookmarkTree } from '../../../typings/bookmarks';

@Component({
  selector: 'curedit-open',
  templateUrl: './open.component.html',
  styleUrls: ['./open.component.scss']
})
export class OpenComponent implements OnInit {
  private bookFolders: BookmarkTree[] = [];

  readonly customColumn = 'title';
  readonly defaultColumns = ['size', 'modified'];
  readonly allColumns = [this.customColumn, ...this.defaultColumns];

  dataSource: NbTreeGridDataSource<BookmarkGridEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    private bookmarksService: BookmarksService,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<BookmarkGridEntry>
  ) {}

  ngOnInit() {
    this.bookmarksService.getAllFolders().subscribe(ff => {
      this.bookFolders = this.sortByModified(ff);
      this.dataSource = this.dataSourceBuilder.create(
        this.bookmarksService.mapTreesToGridTrees(this.bookFolders)
      );
    });
  }

  private sortByModified(ff: BookmarkTree[]) {
    return ff.sort(
      (x, y) =>
        y.dateGroupModified || y.dateAdded - x.dateGroupModified || x.dateAdded
    );
  }

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + nextColumnStep * index;
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  // openFolder(id?: string) {
  //   id = id || this.bookFolders[0].parentId || this.bookFolders[0].id;
  //   this.bookmarksService.getSubFolders(id).subscribe(sf => {
  //     this.bookFolders = this.sortByModified(sf);
  //   });
  // }
}
