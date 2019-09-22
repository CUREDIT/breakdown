import { Injectable } from '@angular/core';
import { Edge, isRefNode, NodeRef } from 'src/app/models/edge.model';
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
    const nodeId = typeof (node) === 'string' ? node : node.id;
    return this.singletonGraph.nodes.find(n => n.id === nodeId) || new Node(nodeId);
  }

  /**
   * Gets edge referencing the existing nodes of the graph
   * @param e : Edge with source NodeRef and target NodeRef
   * @returns edge connecting graph's existing nodes
   */
  getEdgeInGraph(e: Edge): Edge {
    const sourceId = this.getIdFromNodeRef(e.source);
    const targetId = this.getIdFromNodeRef(e.target);
    return new Edge(this.getNodeInGraph(sourceId), this.getNodeInGraph(targetId));
  }

  getIdFromNodeRef(nodeRef: NodeRef): string {
    return isRefNode(nodeRef) ? nodeRef.id : nodeRef.toString();
  }

  getIdsFromNodeRefs(nodeRefs: NodeRef[]): string[] {
    return nodeRefs.map(nr => this.getIdFromNodeRef(nr));
  }

  updateNodes(nodes: Node[], remove: boolean): Node[] {
    const inGraphNodes = nodes.map(n => this.getNodeInGraph(n));
    if (!remove) {
      this.singletonGraph.nodes.push(...inGraphNodes);
    } else {
      const inGraphNodeIds = inGraphNodes.map(n => n.id);
      this.singletonGraph.nodes = this.singletonGraph.nodes.filter(n => !inGraphNodeIds.includes(n.id));
    }
    return this.nodes;
  }

  updateEdges(edges: Edge[], remove: boolean): Edge[] {
    const inGraphEdges = edges.map(e => this.getEdgeInGraph(e));
    if (!remove) {
      this.singletonGraph.edges.push(...inGraphEdges);
    } else {
      const inGraphEdgeRefIds = inGraphEdges.map(e => this.getIdsFromNodeRefs([e.source, e.target]));
      this.singletonGraph.edges = this.singletonGraph.edges
        .filter(n => !inGraphEdgeRefIds.includes(this.getIdsFromNodeRefs([n.source, n.target])));
    }
    return this.edges;
  }

  removeNodes(nodes: Node[]) {

  }

  removeEdges(edges: Edge[]) {

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
