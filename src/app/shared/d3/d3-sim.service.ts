import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { Node } from 'src/app/models/node.model';
import { Graph } from '../../models/graph.model';
import { Simulation } from '../../models/simulation.model';
import { XY } from '../../models/typings/graph';


@Injectable({
  providedIn: 'root'
})
export class D3SimService {

  private graph: Graph;
  private axes: XY;

  constructor() { }

  setGraph(graph: Graph) {
    this.graph = graph || this.graph;
  }

  setAxes(axes: XY) {
    this.axes = axes || this.axes;
  }

  startSimulation(graph?: Graph, axes?: XY): Simulation {
    this.graph = graph || this.graph;
    this.axes = axes || this.axes;
    return this.graph && this.axes ? new Simulation(graph, axes) : null;
  }

  makeDraggable(element: Element, node: Node, sim: Simulation) {
    const d3Element = d3.select(element);

    function started() {
      d3.event.sourceEvent.stopPropagation();

      if (!d3.event.active) {
        sim.d3Sim.alphaTarget(0.3).restart();
      }

      d3.event.on('drag', dragged).on('end', ended);

      function dragged() {
        // node.fx = Math.max(node.r, Math.min(this.axes.x - 200 - node.r, d3.event.x));
        // node.fy = Math.max(node.r, Math.min(this.axes.y - 200 - node.r, d3.event.y));
        node.fx = d3.event.x;
        node.fy = d3.event.y;
      }

      function ended() {
        if (!d3.event.active) {
          sim.d3Sim.alphaTarget(0);
        }
        node.fx = null;
        node.fy = null;
      }
    }

    d3Element.call(d3.drag().on('start', started));
  }
}
