import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbSearchService, NbDialogService, NbDialogRef } from '@nebular/theme';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { NewComponent } from './new/new.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'curedit-init-bar',
  templateUrl: './init-bar.component.html',
  styleUrls: ['./init-bar.component.scss']
})
export class InitBarComponent implements OnInit, OnDestroy {

  private routerSub: Subscription;

  constructor(
    private searchService: NbSearchService,
    private dialogService: NbDialogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.routerSub = this.route.url.subscribe(urlSegments => {
      if (
        urlSegments.filter(urlSeg => urlSeg && urlSeg.path === 'new').length
      ) {
        this.dialogService.open(NewComponent, {
          autoFocus: true,
          closeOnEsc: false,
          closeOnBackdropClick: false,
          hasBackdrop: true
        });
      }
    });
  }

  activateSearch() {
    this.searchService.activateSearch('rotate-layout', 'initbar');
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }
}
