export interface XY {
  x: number;
  y: number;
}

export interface NodeOrder {
  [nodeId: string]: {
    sources: number;
    targets: number;
  };
}
