import { Edge, isRefNode } from './edge.model';
import { Node } from './node.model';

export class Graph {

  nodes: Node[] = [];
  edges: Edge[] = [];

  constructor(nodes: Node[], edges: Edge[]) {
    this.nodes = nodes;
    this.edges = edges;
  }

  getLinkCount(node: Node) {
    if (!node || this.nodes.map(n => n.id).indexOf(node.id) < 0) {
      return 0;
    }
    const refs = [];
    this.edges.forEach(l => {
      isRefNode(l.source) ? refs.push(l.source.id) : refs.push(l.source);
      isRefNode(l.target) ? refs.push(l.target.id) : refs.push(l.target);
    });
    return refs.filter(r => r === node.id).length;
  }

}
