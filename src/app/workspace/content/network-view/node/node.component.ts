import { Component, EventEmitter, Input, Output, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { Node } from '../../../../models/node.model';
import { XY } from '../../../../typings/graph';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[cureditNode]',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnChanges {

  @Input() node: Node;

  @Output() nodeClick = new EventEmitter<XY>();

  nodeClicked(event: MouseEvent) {
    this.nodeClick.emit({
      x: event.offsetX,
      y: event.offsetY
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // this.node.x = Math.max(this.node.r, Math.min(300 - this.node.r, changes.node.currentValue.x));
    // this.node.y = Math.max(this.node.r, Math.min(300 - this.node.r, changes.node.currentValue.y));
  }

}
