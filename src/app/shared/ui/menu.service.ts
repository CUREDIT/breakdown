import { Injectable } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private readonly SIDEBAR_MENU: NbMenuItem[] = [
    {
      title: 'New Book',
      icon: 'plus-outline',
      link: '',
      home: true
    },
    {
      title: 'Book Shelf',
      group: true
    },
    {
      title: 'Open Book',
      icon: 'book-open-outline',
      children: [
        {
          title: 'Breakdown Sample',
          link: '/book/breakdown'
        }
      ]
    }
  ];

  constructor() { }

  getSidebarMenu(): NbMenuItem[] {
    return this.SIDEBAR_MENU.slice();
  }

  addSidebarMenuItem(menuItem: NbMenuItem): NbMenuItem[] {
    this.SIDEBAR_MENU.push(menuItem);
    return this.getSidebarMenu();
  }

  addSidebarBook(book: {title: string, link: string}): NbMenuItem[] {
    this.SIDEBAR_MENU[2].children.push(book);
    return this.getSidebarMenu();
  }

}
