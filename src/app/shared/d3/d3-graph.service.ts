import { Injectable } from '@angular/core';
import { Edge, isRefNode } from 'src/app/models/edge.model';
import { Node } from 'src/app/models/node.model';
import { Graph } from '../../models/graph.model';

@Injectable({
  providedIn: 'root'
})
export class D3GraphService {

  private singletonGraph: Graph;

  constructor() {
    this.singletonGraph = new Graph([], []);
  }

  /**
   * Gets node if it exists in graph, else returns
   * new node instance from given serialized node instance
   * or new node instance with the given serialized string id
   * @param node: Node
   * @returns node if exists else returns an instance with the id from input
   */
  getNodeInGraph(node: Node | string): Node {
    const nodeId = typeof(node) === 'string' ? node : node.id;
    return this.singletonGraph.nodes.find(n => n.id === nodeId) || new Node(nodeId);
  }

  /**
   * Gets edge referencing the existing nodes of the graph
   * @param e : Edge with source NodeRef and target NodeRef
   * @returns edge connecting graph's existing nodes
   */
  getEdgeInGraph(e: Edge): Edge {
    const sourceId = isRefNode(e.source) ? e.source.id : e.source.toString();
    const targetId = isRefNode(e.target) ? e.target.id : e.target.toString();
    return new Edge(this.getNodeInGraph(sourceId), this.getNodeInGraph(targetId));
  }

  addNodes(nodes: Node[]): Node[] {
    this.singletonGraph.nodes.push(...nodes);
    return this.nodes;
  }

  addEdges(edges: Edge[]): Edge[] {
    this.singletonGraph.edges.push(...edges);
    return this.edges;
  }

  get graph(): Graph {
    return this.singletonGraph;
  }

  set nodes(nodes: Node[]) {
    this.singletonGraph.nodes = nodes || this.singletonGraph.nodes;
  }

  get nodes(): Node[] {
    return this.singletonGraph.nodes.slice();
  }

  set edges(edges: Edge[]) {
    this.singletonGraph.edges = edges || this.singletonGraph.edges;
  }

  get edges(): Edge[] {
    return this.singletonGraph.edges.slice();
  }

}
