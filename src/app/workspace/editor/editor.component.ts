import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'curedit-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @Input() top: number;
  @Input() left: number;

  constructor() { }

  ngOnInit() {
  }

}
