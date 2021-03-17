import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlImg'
})
export class UrlImgPipe implements PipeTransform {

  url: string;
  mileUrl = 'http://img.mile.by';

  transform(value: string): string {
    try {
      let obj = JSON.parse(value);
      if(obj.status === 'ok') 
        this.url = this.mileUrl + obj.Url;
      else this.url = '../../../../../assets/no_photo.png';
      return this.url;
    }
    catch {
      return '../../../../../assets/no_photo.png';
    }
  }
}
