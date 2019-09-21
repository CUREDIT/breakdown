import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { Simulation } from 'src/app/models/simulation.model';
import { Node } from '../../models/node.model';
import { D3SimService } from './d3-sim.service';

@Directive({
  selector: '[cureditD3Drag]'
})
export class D3DragDirective implements OnInit {

  @Input() node: Node;
  @Input('cureditD3Drag') sim: Simulation;

  constructor(private d3Service: D3SimService, private elRef: ElementRef) { }

  ngOnInit() {
    this.d3Service.makeDraggable(this.elRef.nativeElement, this.node, this.sim);
  }
}
