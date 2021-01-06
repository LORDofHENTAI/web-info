import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mathStr'
})
export class MathStrPipe implements PipeTransform {

  transform(value: string): number {
    let t = 0;
    if(value) {
      t = parseFloat(value.replace(',', '.'));
    }
    return t;
  }
}
