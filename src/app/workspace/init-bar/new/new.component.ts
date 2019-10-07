import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbMenuService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'curedit-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  workSpaceName: string;

  constructor(
    private dialogRef: NbDialogRef<any>,
    private menuService: NbMenuService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  create() {
    this.dialogRef.close();
    this.router.navigate(['content', this.workSpaceName], { relativeTo: this.route });
  }

  close() {
    this.dialogRef.close();
    this.menuService.navigateHome();
  }
}
