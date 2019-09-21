import { Component, OnInit } from '@angular/core';
import { XY } from 'src/app/models/types/graph';

@Component({
  selector: 'curedit-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  flipped = false;

  constructor() { }

  ngOnInit() {}

}
