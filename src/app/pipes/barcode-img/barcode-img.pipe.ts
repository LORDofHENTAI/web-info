import { Pipe, PipeTransform } from '@angular/core';
import { BarcodeService } from 'src/app/common/services/barcode/barcode.service';
import { Barcode } from 'src/app/product-ordering-manager/models/barcode';

@Pipe({
  name: 'barcodeImg'
})
export class BarcodeImgPipe implements PipeTransform {

  prefix = "data:image/jpeg;base64,";
  barImg: string

  constructor(
    private barcodeService: BarcodeService
    ) { }
  
  async transform(barcode: string): Promise<string> {
    this.getBse64(barcode);
    await this.delay(1000);
    return this.barImg;
  }

  getBse64(barcode: string) {
    this.barcodeService.getBase64String(new Barcode(barcode)).subscribe(response => {
      if (response) {
        this.barImg = this.prefix + response;
      }
    },
    error => {
      console.log(error);
    }); 
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
