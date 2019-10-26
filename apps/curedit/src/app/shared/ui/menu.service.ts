import { Injectable } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private hidden = false;
  private favorites = [
    {
      title: 'Sample',
      link: '/content/breakdown',
      icon: 'book-open-outline',
    },
    {
      title: 'Sample 2',
      link: '/content/breakdown',
      icon: 'book-open-outline'
    }
  ];
  private recent = [
    {
      title: 'Sample',
      link: '/content/breakdown',
      icon: 'book-open-outline',
    },
    {
      title: 'Sample 2',
      link: '/content/breakdown',
      icon: 'book-open-outline'
    }
  ];

  private readonly SIDEBAR_MENU: NbMenuItem[] = [
    {
      title: 'Home',
      icon: 'home-outline',
      link: '/',
      pathMatch: 'full',
      home: true
    },
    {
      title: 'New Workspace',
      icon: 'plus-outline',
      link: '/new'
    },
    {
      title: 'Add',
      icon: 'person-add-outline',
      hidden: this.hidden
    },
    {
      title: 'Export',
      icon: 'download-outline',
      hidden: this.hidden
    },
    {
      title: 'Share',
      icon: 'share-outline',
      hidden: this.hidden
    },
    {
      title: 'Delete',
      icon: 'trash-2-outline',
      hidden: this.hidden
    },
    {
      title: 'Workspaces',
      group: true
    },
    {
      title: 'Favorites',
      icon: 'star-outline',
      expanded: true,
      children: this.favorites
    },
    {
      title: 'Recent',
      icon: 'flash-outline',
      expanded: true,
      children: this.recent
    },

  ];

  constructor() { }

  getSidebarMenu(): NbMenuItem[] {
    return this.SIDEBAR_MENU.slice();
  }

  addSidebarMenuItem(menuItem: NbMenuItem): NbMenuItem[] {
    this.SIDEBAR_MENU.push(menuItem);
    return this.getSidebarMenu();
  }

  private addSubmenu(menuItem: { title: string, link: string}, recent= false) {
    const submenu = recent ? this.recent : this.favorites;
    submenu.push({...menuItem, icon: 'book-open-outline'});
  }

  addRecent(menuItem: { title: string, link: string}): NbMenuItem[] {
    this.addSubmenu(menuItem, true);
    return this.recent.slice();
  }

  addFavorite(menuItem: { title: string, link: string}): NbMenuItem[] {
    this.addSubmenu(menuItem, false);
    return this.recent.slice();
  }

}
