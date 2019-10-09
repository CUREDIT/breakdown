import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { XY } from 'src/app/typings/graph';


@Component({
  selector: 'curedit-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnChanges {
  top: number;
  left: number;

  @Input() coords: XY;
  @Input() title: string;

  editorText: string;

  ngOnInit() {
    this.left = this.coords.x;
    this.top = this.coords.y;
  }

  ngOnChanges(change: SimpleChanges) {
    console.log('change', change);
  }
}
