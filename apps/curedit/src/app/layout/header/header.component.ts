import { Component, OnInit } from '@angular/core';
import { NbSidebarService, NbMenuService } from '@nebular/theme';

@Component({
  selector: 'curedit-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService
    ) { }

  ngOnInit() {
  }

  toggleSidebar() {
    this.sidebarService.toggle(true, 'menu-sidebar');
  }

  navigateHome() {
    this.menuService.navigateHome();
  }

}
