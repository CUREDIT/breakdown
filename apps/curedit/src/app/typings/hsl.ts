export enum Hue {
  RED = 0,
  YELLOW = 60,
  GREEN = 120,
  CYAN = 180,
  BLUE = 240,
  MAGENTA = 300
}

export class Hsl {

  private hue: Hue | number;
  private saturation: number;
  private lightness: number;

  constructor(hue: Hue | number, saturation: number, lightness: number) {
    this.hue = hue % 360;
    this.lightness = lightness % 100;
    this.saturation = saturation % 100;
  }

  static getBlueShade(seed: string): string {
    return new Hsl(Hue.BLUE, this.random25to75(), this.random25to75()).color;
  }

  // 25 < - > 75 %
  private static random25to75() {
    return Math.floor(Math.random() * 51) + 25;
  }

  get color(): string {
    return `hsl(${this.hue},${this.saturation}%,${this.lightness}%)`;
  }

  toString(): string {
    return this.color;
  }
}
