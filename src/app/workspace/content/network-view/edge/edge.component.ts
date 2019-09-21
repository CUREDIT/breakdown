import { Component, Input } from '@angular/core';
import { Edge, isRefNode } from 'src/app/models/edge.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[cureditEdge]',
  templateUrl: './edge.component.html',
  styleUrls: ['./edge.component.scss']
})
export class EdgeComponent {

  @Input() edge: Edge;

  readonly default = { x: 0, y: 0 };

  get source() {
    return isRefNode(this.edge.source) ? this.edge.source : this.default;
  }

  get target() {
    return isRefNode(this.edge.target) ? this.edge.target : this.default;
  }

}
