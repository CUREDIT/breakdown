import { Hsl } from './hsl';
import { Polygon, Ellipse } from './shapes';

export type Doc = 'text' | 'json' | 'asciidoc' | 'markdown';
export type Directionality = 'none' | 'uni' | 'multi';

export interface Metatype {
  label: string;
  color: string | Hsl;
  shape?: Polygon | Ellipse;
  duals?: number;
}

export interface LinkMetatype extends Metatype {
  flow?: Directionality;
}

export interface Content {
  type: Doc;
  content: string;
}

