export interface Polygon {
  sides: number;
  isRegular: boolean;
  sideLength: (side: number) => number;
}

export interface Ellipse {
  radius: number;
  verticalRadius?: number;
}

/* TODO
support concave or convex polygon choices
add missing plane curves: parabola and hyperbola
 */
