import { Edge } from '../../models/edge.model';
import { Graph } from '../../models/graph.model';
import { Node } from '../../models/node.model';
import { Injectable } from '@angular/core';
import { IdType } from 'vis';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
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
  getNodeInGraph(node: IdType): Node {
    return (
      this.singletonGraph.nodes.find(n => n.id === node) ||
      new Node(node.toString())
    );
  }

  /**
   * Gets edge referencing the existing nodes of the graph
   * @param e : Edge with source NodeRef and target NodeRef
   * @returns edge connecting graph's existing nodes
   */
  getEdgeInGraph(e: Edge): Edge {
    return new Edge(
      this.getNodeInGraph(e.from).id,
      this.getNodeInGraph(e.to).id
    );
  }

  // getIdFromNodeRef(nodeRef: IdType): string {
  //   return isRefNode(nodeRef) ? nodeRef.id : nodeRef.toString();
  // }

  // getIdsFromNodeRefs(nodeRefs: IdType[]): string[] {
  //   return nodeRefs.map(nr => this.getIdFromNodeRef(nr));
  // }

  updateNodes(nodes: Node[], remove: boolean): Node[] {
    const inGraphNodes = nodes.map(n => this.getNodeInGraph(n.id));
    if (!remove) {
      this.singletonGraph.nodes.push(...inGraphNodes);
    } else {
      const inGraphNodeIds = inGraphNodes.map(n => n.id);
      this.singletonGraph.nodes = this.singletonGraph.nodes.filter(
        n => !inGraphNodeIds.includes(n.id)
      );
    }
    return this.nodes;
  }

  updateEdges(edges: Edge[], remove: boolean): Edge[] {
    const inGraphEdges = edges.map(e => this.getEdgeInGraph(e));
    if (!remove) {
      this.singletonGraph.edges.push(...inGraphEdges);
    } else {
      this.singletonGraph.edges = this.singletonGraph.edges.filter(
        se =>
          !inGraphEdges
            .map(ie => ({ from: ie.from, to: ie.to }))
            .includes({ from: se.from, to: se.to })
      );
    }
    return this.edges;
  }

  removeNodes(nodes: Node[]) {}

  removeEdges(edges: Edge[]) {}

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
