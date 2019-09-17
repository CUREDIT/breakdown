import { Subject } from 'rxjs';

import * as d3 from 'd3';

import { Graph } from './graph.model';
import { XYLengths } from './types/svg';
import { Node } from './node.model';
import { Edge } from './edge.model';

const DEFAULT_DISTANCE = 100;
const DEFAULT_STRENGTH = -200;

export class Simulation {

  id: number;
  graph: Graph;

  private d3Sim: d3.Simulation<Node, Edge>;
  ticker = new Subject<d3.Simulation<Node, Edge>>();

  constructor(graph: Graph, axes: XYLengths) {
    this.graph = graph;
    this.init(axes);
  }

  init(axes: XYLengths) {
    if (!axes || !axes.xLength || !axes.yLength) {
      throw new Error('Axes lengths missing');
    }

    if (!this.d3Sim) {
      const ticker = this.ticker;

      this.d3Sim = d3.forceSimulation()
        .force('charge',
          d3.forceManyBody().strength(DEFAULT_STRENGTH))
        .force('collide',
          d3.forceCollide()) as d3.Simulation<Node, Edge>;

      this.d3Sim.on('tick', function() {
        ticker.next(this);
      });

      this.refreshGraph();
     }

    this.d3Sim.force('center',
      d3.forceCenter(axes.xLength / 2, axes.yLength / 2));
    this.d3Sim.restart();
  }

  refreshGraph() {
    if (this.d3Sim) {
      this.d3Sim.nodes(this.graph.nodes);
      this.d3Sim.force('links',
        d3.forceLink(this.graph.edges)
          .id((d: Node) => d.id)
          .distance(DEFAULT_DISTANCE));
    }
  }
}
