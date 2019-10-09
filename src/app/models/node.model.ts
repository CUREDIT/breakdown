import { Hue } from '../typings/hsl';
import { Content, Metatype } from '../typings/meta';

const DEFAULT_COLOR = `hsl(${Hue.BLUE}, 50%, 50%)`;

export class Node {

    // NB: index is assigned internally by simulation, once initialized it is defined
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

  graphId: number;

  color = DEFAULT_COLOR;

  label: string;

  constructor(id: string) {
    this.id = id;
    this.label = id;
  }


  // get label(): string {
  //   return this.meta && this.meta.label ? this.meta.label : this.id;
  // }

  get color2(): string {
    return this.meta && this.meta.color ?
      this.meta.color.toString() :
      DEFAULT_COLOR;
  }

  private normal = () => {
    return Math.sqrt(3 / 100);
  }

  get r() {
    return 50 * this.normal() + 15;
  }

  get fontSize() {
    return (30 * this.normal() + 10) + 'px';
  }



}
