import { IdType } from 'vis';
import { LinkMetatype } from '../typings/meta';

// export type NodeRef = string | number | Node;

// export function isRefNode(ref: NodeRef): ref is Node {
//   return typeof ref !== 'number' && typeof ref !== 'string';
// }

export class Edge {

  // NB: index is assigned internally by force, once initialized it is defined
  index?: number;
  label?: string;

  meta?: LinkMetatype;

  graphId?: number;

  constructor(public from: IdType, public to: IdType) {}

}

