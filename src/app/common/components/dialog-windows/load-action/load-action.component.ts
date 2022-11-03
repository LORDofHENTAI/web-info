import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-action',
  templateUrl: './load-action.component.html',
  styleUrls: ['./load-action.component.scss']
})
export class LoadActionComponent implements OnInit {
  selectedLoadType: string = '1';

  columnTempName: string[] = ['Артикул', 'Торговый объект', 'Цена', 'Процент скидки'];
  columnName: string[] = ['Артикул', 'Торговый объект', 'Цена', 'Процент скидки', 'Предварительное значение'];

  constructor() { }

  ngOnInit(): void {
  }
  selectedFiles: File;
  selectedFile: File;
  selectedFileName: string = 'Выберите файл';

  selectFile(event: any): void {
    this.selectedFileName = '';
    this.selectedFiles = event.target.files;
    this.selectedFileName = this.selectedFiles[0].name;
    this.selectedFile = this.selectedFiles[0];
    console.log(this.selectedFile);
  }

  upload(): void {
    // this.showLoadingBar = true;
    // this.productPriceService.uploadList(new PrintUpload(this.tokenService.getToken(), this.selectedFile, this.priceFromFile, this.selectedPriceCategory, this.selectedPriceFormat, this.tokenService.getShop(), this.tokenService.getType()), type).subscribe(
    // responce => {
    // console.log(responce);
    // this.showLoadingBar = false;
    // if (responce = 'true') {

    //   }
    //   else {
    //   }
    // },
    // error => {
    // this.showLoadingBar = false;
    // console.log(error);
    // });
  }
}
