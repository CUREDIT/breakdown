import { ControlValueAccessor } from '@angular/forms';

export class Accessor implements ControlValueAccessor {

  onChangeFunc: (_) => {};
  onTouchedFunc: () => {};
  modelVal: string;

  set val(val: string) {
    if (val !== this.modelVal) {
      this.onChangeFunc(this.modelVal = val);
    }
  }

  get val(): string {
    return this.modelVal;
  }

  writeValue(obj: any): void {
    const objStr = obj.toString();
    if (objStr !== this.modelVal) {
      this.modelVal = objStr;
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeFunc = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFunc = fn;
  }

}
