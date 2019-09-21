import { Edge, isRefNode } from './edge.model';
import { Node } from './node.model';
import { NodeOrder } from './types/graph';
export class Graph {

  id: number;
  nodes: Node[] = [];
  edges: Edge[] = [];

  constructor(nodes: Node[], edges: Edge[], id?: number) {
    this.nodes = nodes;
    this.edges = edges;
    this.id = id || 1;
    this.nodes.forEach(n => n.graphId = this.id);
    this.edges.forEach(e => e.graphId = this.id);
  }

  private edgeRefs(): { sources: string[], targets: string[] } {
    const sources: string[] = [];
    const targets: string[] = [];
    this.edges.forEach( (edge: Edge) => {
      isRefNode(edge.source) ?
        sources.push(edge.source.id) : sources.push(edge.source.toString());
      isRefNode(edge.target) ?
        targets.push(edge.target.id) : targets.push(edge.target.toString());
    });
    return { sources, targets };
  }

  private getNodeOrder(node: Node, sources: string[], targets: string[]) {
    return {
      [node.id]: {
        sources: sources.filter(s => s === node.id).length,
        targets: targets.filter(t => t === node.id).length
      }
    };
  }


  get edgeCounts(): NodeOrder[] {
    const edgeCounts: NodeOrder[] = [];
    const { sources, targets } = this.edgeRefs();
    this.nodes.forEach( (node: Node) => {
      edgeCounts.push(this.getNodeOrder(node, sources, targets));
    });
    return edgeCounts;
  }

  getEdgeCount(node: Node): NodeOrder {
    if (!node) {
      return { null: { sources: 0, targets: 0 }};
    }
    if (this.nodes.map(n => n.id).indexOf(node.id) < 0) {
      return {[node.id]: { sources: 0, targets: 0}};
    }
    const { sources, targets } = this.edgeRefs();
    return this.getNodeOrder(node, sources, targets);
  }

}
