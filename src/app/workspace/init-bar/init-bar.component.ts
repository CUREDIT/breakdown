import { Component, OnInit } from '@angular/core';
import { NbSearchService } from '@nebular/theme';

@Component({
  selector: 'curedit-init-bar',
  templateUrl: './init-bar.component.html',
  styleUrls: ['./init-bar.component.scss']
})
export class InitBarComponent implements OnInit {

  constructor(private searchService: NbSearchService) { }

  ngOnInit() {
  }

  activateSearch() {
    this.searchService.activateSearch('rotate-layout', 'initbar');
  }

}
