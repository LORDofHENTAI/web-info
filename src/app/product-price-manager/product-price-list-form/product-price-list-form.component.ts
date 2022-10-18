import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/common/services/snackbar/snackbar.service';
import { TokenService } from 'src/app/common/services/token/token.service';
import { ProductPriceService } from 'src/app/product-price-manager/services/product-price.service';
import { SimpleChanges } from '@angular/core';
import { PrintWindowComponent } from 'src/app/price-tags/dialog-windows/print-window/print-window.component';
import { Print } from '../models/print'
import { PrintQuery } from '../models/print-query';
import { AddToPrint } from '../models/add-to-print';
import { PrintDelete } from '../models/print-delete';
import { Observable } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PrintUpload } from '../models/print-upload';
import { TileStyler } from '@angular/material/grid-list/tile-styler';
import { PriceFormat } from '../models/price-settings-models/price-format';
import { GetPriceTemp } from '../models/price-settings-models/get-price-temp';
import { PriceStyle } from '../models/price-settings-models/price-style';
import { FindStyle } from '../models/price-settings-models/find-price-style';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-price-list-form',
  templateUrl: './product-price-list-form.component.html',
  styleUrls: ['./product-price-list-form.component.scss']
})
export class ProductPriceListFormComponent implements OnInit {

  @Input() isOpen: boolean;

  listPrices: Print[];
  displayedColumnsPrint = ['name', 'quantity', 'mesname', 'price', 'summa', 'barcode'];
  imgSource = 'https://barcode.tec-it.com/barcode.ashx?data=';

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';
  styleSucceses = 'green-snackbar';
  styleStandart = 'standart-snackbar';

  priceFormat: PriceFormat;
  idFormat: number;
  styleFileName: string = null;
  priceStyle: PriceStyle;


  constructor(
    public dialog: MatDialog,
    private tokenService: TokenService,
    private snackbarService: SnackbarService,
    private productPriceService: ProductPriceService,
  ) { }

  ngOnInit(): void {
    this.getListPrices();
    this.getPriceFormatList();
  }



  ngOnChanges(changes: SimpleChanges) {
    this.getListPrices();
  }


  getListPrices() {
    if (this.isOpen) {
      this.productPriceService.getListPrices(new PrintQuery(this.tokenService.getToken())).subscribe(response => {
        if (response) {
          this.listPrices = response;
          console.log(response);
        }
      },
        error => {
          console.log(error);
          this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
        });
    }
  }

  addInList(article: string) {
    let addToPrint = new AddToPrint(this.tokenService.getToken(), article, this.tokenService.getShop(), this.tokenService.getType());
    this.productPriceService.addPrice(addToPrint).subscribe(response => {
      if (response = 'true') {
        this.snackbarService.openSnackBar('Товар добавлен в список ценников.', this.action);
        this.getListPrices();
      }
    },
      error => {
        console.log(error);
        this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
      });
  }

  onDeleteItem(price: Print) {
    this.productPriceService.deleteItem(new PrintDelete(this.tokenService.getToken(), String(price.id))).subscribe(response => {
      if (response = 'true') {
        this.snackbarService.openSnackBar('Позиция удалена.', this.action);
        this.getListPrices();
      }
    },
      error => {
        console.log(error);
        this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
      });
  }

  onClearList() {
    this.productPriceService.clearList(new PrintQuery(this.tokenService.getToken())).subscribe(response => {
      if (response = 'true') {
        this.snackbarService.openSnackBar('Список ценников очищен.', this.action);
        this.getListPrices();
      }
    },
      error => {
        console.log(error);
        this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
      });
  }

  onPrintLable() {
    console.log(this.styleFileName);
    const dialogRef = this.dialog.open(PrintWindowComponent, {
      width: '900px',
      height: '1000px',
      data: { priceName: this.styleFileName, idFormat: this.idFormat }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getListPrices();
      }
    });
  }

  openPrintDialog() {
    const dialogRef = this.dialog.open(PricePrintDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.snackbarService.openSnackBar("Загрузка завершена", this.action, this.styleStandart);
        this.getListPrices();
      }
      else
        if (result === false)
          this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }



  getPriceFormatList() {
    this.productPriceService.getPriceFormat(new GetPriceTemp(this.tokenService.getToken())).subscribe(response => {
      console.log(response);
      if (response)
        this.priceFormat = response;
    },
      error => {
        console.log(error);
      });
  }

  getPriceStyleList() {
    let priceStyleList = new FindStyle(this.idFormat, this.tokenService.getToken());
    this.productPriceService.findStyleById(priceStyleList).subscribe(response => {
      if (response)
        this.priceStyle = response;
    },
      error => {
        console.log(error);
      });
  }

  // printPriceList() {
  //   window.open('path');
  // }

}

@Component({
  selector: 'price-print-window',
  templateUrl: 'dialog-window/price-print-window.html',
  styleUrls: ['dialog-window/price-print-window.scss']
})
export class PricePrintDialog {

  priceFormatList = ['none', 'А3', 'А4', 'А4 гор', 'А5', 'А5 гор', 'А6', 'А6 гор'];
  priceCategoryList = ['none', 'Акция', 'Ликвидация', 'Скидка', 'Новинка', 'Товар недели', 'Черная пятница', "Акт переоценки"];
  selectedPriceFormat: string = 'none';
  selectedPriceCategory: string = 'none';
  priceFromFile = false;
  filterShow = false;
  showLoadingBar = false;
  type: string;
  constructor(private router: Router, private productPriceService: ProductPriceService, private tokenService: TokenService, public dialogRef: MatDialogRef<ProductPriceListFormComponent>) { }

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

  upload(type: string): void {
    this.showLoadingBar = true;
    this.productPriceService.uploadList(new PrintUpload(this.tokenService.getToken(), this.selectedFile, this.priceFromFile, this.selectedPriceCategory, this.selectedPriceFormat, this.tokenService.getShop(), this.tokenService.getType()), type).subscribe(
      responce => {
        console.log(responce);
        this.showLoadingBar = false;
        if (responce = 'true') {
          this.dialogRef.close(true);
        }
        else {
          this.dialogRef.close(false);
        }
      },
      error => {
        this.showLoadingBar = false;
        console.log(error);
      });
  }

}