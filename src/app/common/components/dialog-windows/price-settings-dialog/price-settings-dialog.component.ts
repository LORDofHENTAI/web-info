import { Component, OnInit } from '@angular/core';
import { AddPriceFormat } from 'src/app/product-price-manager/models/price-settings-models/add-price-format';
import { GetPriceTemp } from 'src/app/product-price-manager/models/price-settings-models/get-price-temp';
import { ProductPriceService } from 'src/app/product-price-manager/services/product-price.service';
import { TokenService } from 'src/app/common/services/token/token.service';
import { PriceFormat } from 'src/app/product-price-manager/models/price-settings-models/price-format';
import { PriceStyle } from 'src/app/product-price-manager/models/price-settings-models/price-style';
import { DeletePriceTemp } from 'src/app/product-price-manager/models/price-settings-models/delete-price-temp';
import { FindStyle } from 'src/app/product-price-manager/models/price-settings-models/find-price-style';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { AddPriceStyle } from 'src/app/product-price-manager/models/price-settings-models/add-price-style';

@Component({
  selector: 'app-price-settings-dialog',
  templateUrl: './price-settings-dialog.component.html',
  styleUrls: ['./price-settings-dialog.component.scss']
})
export class PriceSettingsDialogComponent implements OnInit {

  priceFormat: PriceFormat;
  priceStyle: PriceStyle;
  formatName = '';
  styleName = '';
  idFormat: any;
  idStyle: any;


  deleteFormat: boolean = false;
  deleteStyle: boolean = false;


  tableStyleHeader = ["Название стиля", "Имя файла"];

  constructor(
    private productPriceService: ProductPriceService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.getPriceFormat();
  }

  getPriceFormat() {

    this.productPriceService.getPriceFormat(new GetPriceTemp(this.tokenService.getToken())).subscribe(result => {
      if (result) {
        this.priceFormat = result;
      }
    },
      error => {
        console.log(error);
      });
  }

  chooseFormat(element) {
    this.idFormat = element;
    console.log(this.idFormat);
    this.getPriceStyleByFormat();
    this.deleteFormat = true;
  }

  chooseStyle(element) {
    this.idStyle = element;
    console.log(this.idStyle);
    this.deleteStyle = true;
  }

  getPriceStyleByFormat() {
    let findStyle = new FindStyle(this.idFormat, this.tokenService.getToken());
    this.productPriceService.findStyleById(findStyle).subscribe(response => {
      if (response) {
        this.priceStyle = response;
      }
    },
      error => {
        console.log(error);
      });
  }

  // getPriceStyle() {
  //   this.productPriceService.getPriceStyle(new GetPriceTemp(this.tokenService.getToken())).subscribe(result => {
  //     if (result) {
  //       this.priceStyle = result;
  //     }
  //   },
  //     error => {
  //       console.log(error);
  //     });
  // }

  addPriceFormat() {
    let addPriceFormat = new AddPriceFormat(this.tokenService.getToken(), this.formatName);
    this.productPriceService.addPriceFormat(addPriceFormat).subscribe(result => {
      console.log(result)
      if (result = 'true') {
        this.getPriceFormat();
      }
    },
      error => {
        console.log(error);
      });
  }

  deletePriceFormat() {
    let deletePriceFormat = new DeletePriceTemp(this.tokenService.getToken(), this.idFormat);
    this.productPriceService.deletePriceFormat(deletePriceFormat).subscribe(result => {
      console.log(result);
      if (result = 'true') {
        this.getPriceFormat();
      }
    },
      error => {
        console.log(error);
      });
  }



  deletePriceStyle() {
    let deletePriceStyle = new DeletePriceTemp(this.tokenService.getToken(), this.idStyle);
    this.productPriceService.deletePriceStyle(deletePriceStyle).subscribe(result => {
      console.log(result)
      if (result = 'true') {
        this.getPriceStyleByFormat();
      }
    },
      error => {
        console.log(error);
      });
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

  addPriceStyle() {
    if (!this.selectFile) {
      let addPriceStyle = new AddPriceStyle(this.tokenService.getToken(), this.selectedFile, this.idFormat, this.styleName);
      this.productPriceService.addPriceStyle(addPriceStyle).subscribe(response => {
        if (response = 'true') {
          this.getPriceStyleByFormat();
        }
      },
        error => {
          console.log(error);
        })
    }
  }
}
