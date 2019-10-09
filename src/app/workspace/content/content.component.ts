import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

const CONTENT = 'content';
const CONTEXT = 'context';
@Component({
  selector: 'curedit-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy {
  flipped = false;
  workspaceName: string;

  urlSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.urlSub = this.route.url.subscribe(urlSegs => {
      this.flipped = urlSegs[0].path === CONTENT ? false : true;
      this.workspaceName = urlSegs[1].path;
    });
  }

  toggleNav() {
    if (this.flipped) {
      this.location.go(
        this.router.createUrlTree([CONTENT, this.workspaceName]).toString()
      );
    } else {
      this.location.go(
        this.router.createUrlTree([CONTEXT, this.workspaceName]).toString()
      );
    }
    this.flipped = !this.flipped;
  }

  ngOnDestroy() {
    this.urlSub.unsubscribe();
    // TODO save current state of the graph
  }
}
