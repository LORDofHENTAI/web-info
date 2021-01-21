import { Pipe, PipeTransform } from '@angular/core';

interface List{
  id: number;
  name: string;
}

@Pipe({
  name: 'filterlist'
})
export class FilterlistPipe implements PipeTransform {

  transform(value: number, list: List[]): string {
    return list ? list.find(x => x.id === value).name : null;
  }
}
