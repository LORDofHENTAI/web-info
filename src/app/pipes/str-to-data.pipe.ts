import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strToData'
})
export class StrToDataPipe implements PipeTransform {

  transform(value: string): Date {
    return new Date(value);
  }
}