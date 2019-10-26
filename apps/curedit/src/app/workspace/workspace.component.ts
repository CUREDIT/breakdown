import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { MenuService } from '../shared/ui/menu.service';

@Component({
  selector: 'curedit-workspace',
  template: `
  <curedit-layout>
    <nb-menu [items]="menu"></nb-menu>
    <router-outlet></router-outlet>
  </curedit-layout>
  `,
})
export class WorkspaceComponent implements OnInit {

  menu: NbMenuItem[];

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.menu = this.menuService.getSidebarMenu();
  }

}
