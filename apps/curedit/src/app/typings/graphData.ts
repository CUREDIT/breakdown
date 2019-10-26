import { Node, Edge, DataSet } from 'vis';

export interface GraphData {
  nodes: DataSet<Node>;
  edges: DataSet<Edge>;
}
