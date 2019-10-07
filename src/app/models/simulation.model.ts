import { Subject } from 'rxjs';

import * as d3 from 'd3';

import { Graph } from './graph.model';
import { XY } from '../typings/graph';
import { Node } from './node.model';
import { Edge } from './edge.model';

const DEFAULT_DISTANCE = 100;
const DEFAULT_STRENGTH = -200;

export class Simulation {

  id: number;
  graph: Graph;

  d3Sim: d3.Simulation<Node, Edge>;
  ticker = new Subject<d3.Simulation<Node, Edge>>();

  constructor(graph: Graph, axes: XY) {
    this.graph = graph;
    this.init(axes);
  }



  init(axes: XY) {
    if (!axes || !axes.x || !axes.y) {
      throw new Error('Axes lengths missing');
    }

    // const boxForce = () => {
    //   for (let i = 0, n = this.graph.nodes.length; i < n; ++i) {
    //     const currNode = this.graph.nodes[i];
    //     currNode.x = Math.max(currNode.r, Math.min(axes.x - 200 - currNode.r, currNode.x));
    //     currNode.y = Math.max(currNode.r, Math.min(axes.y - 200 - currNode.r, currNode.y));
    //   }
    // };

    if (!this.d3Sim) {
      const ticker = this.ticker;

      this.d3Sim = d3.forceSimulation()
        // .force('box', boxForce)
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
      d3.forceCenter(axes.x / 2, axes.y / 2));
    this.d3Sim.restart();
  }

  destroy() {
    this.d3Sim = null;
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
