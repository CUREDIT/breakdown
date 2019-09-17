import { Doc } from 'src/app/models/types/meta';
import { Content, Metatype } from './types/meta';

const DEFAULT_COLOR = 'skyblue';

export class Node implements d3.SimulationNodeDatum {

  index?: number;

  x?: number;
  y?: number;

  vx?: number;
  vy?: number;

  fx?: number | null;
  fy?: number | null;

  id: string;

  meta: Metatype;

  content: Content;

  get label(): string {
    return this.meta && this.meta.label ? this.meta.label : this.id;
  }

  get color(): string {
    return this.meta && this.meta.color ? this.meta.color.toString() : DEFAULT_COLOR;
  }



}
