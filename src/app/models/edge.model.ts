import { Node } from './node.model';
import { LinkMetatype } from './types/meta';

export type NodeRef = string | number | Node;

export function isRefNode(ref: NodeRef): ref is Node {
  return typeof ref !== 'number' && typeof ref !== 'string';
}

export class Edge implements d3.SimulationLinkDatum<Node> {

  // NB: index is assigned internally by force, once initialized it is defined
  index?: number;
  label?: string;

  meta?: LinkMetatype;

  graphId?: number;

  constructor(public source: NodeRef, public target: NodeRef) {}

}

