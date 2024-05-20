import { Component, HostListener, Inject, Input, OnInit, ViewChild } from '@angular/core';
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
import { GetFiltredPrintListModel } from '../models/print-list-filtred';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { error } from '@angular/compiler/src/util';
import { ShopSection } from '../models/ShopSection';
import { GetFilterExcelModel } from 'src/app/product-pits-manager/models/get-filter-excel.model';

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

  switchEditablePrices: boolean = false;

  constructor(
    public dialog: MatDialog,
    private tokenService: TokenService,
    private snackbarService: SnackbarService,
    private productPriceService: ProductPriceService,
  ) { }

  ngOnInit(): void {
    this.getListPrices();
    this.getPriceFormatList();
    this.onResize()
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
        setTimeout(() => { this.getListPrices() }, 1000)
        this.snackbarService.openSnackBar('Список ценников очищен.', this.action);
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
      disableClose: true,
      width: '900px',
      height: '1000px',
      data: { priceName: this.styleFileName, idFormat: this.idFormat, switchEditablePrices: this.switchEditablePrices }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getListPrices();
      }
    });
  }

  openPrintDialog() {
    const dialogRef = this.dialog.open(PricePrintDialog,
      {
        disableClose: true,
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      switch (result) {
        case "canceled": {
          this.onClearList();
          break;
        }
        case 'true': {
          this.getListPrices();
          break;
        }
        case false: {
          this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
          break;
        }
      }
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
  //! Адаптив

  screenHeight: number
  screenWidth: number
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }
}

@Component({
  selector: 'price-print-window',
  templateUrl: 'dialog-window/price-print-window.html',
  styleUrls: ['dialog-window/price-print-window.scss']
})

export class PricePrintDialog implements OnInit {

  priceFromFile = true;
  shopSections: ShopSection[]
  showLoadingBar = false;
  showFilterConteiner: boolean = false
  type: string;

  ngOnInit(): void {
    this.getshopSections()
  }
  constructor(private router: Router,
    private productPriceService: ProductPriceService,
    private tokenService: TokenService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ProductPriceListFormComponent>,
    public printService: ProductPriceService,) { }

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


  maxPercent: string
  actionDate: string
  showParams: boolean = true;

  upload(type: string): void {
    this.showLoadingBar = true;
    let print = new PrintUpload(this.tokenService.getToken(), this.selectedFile, this.priceFromFile, this.tokenService.getShop(), this.tokenService.getType(), this.actionDate, this.maxPercent)
    this.productPriceService.uploadList(print, type).subscribe(
      responce => {
        this.showLoadingBar = false;
        this.dialogRef.close("true");
      },
      error => {
        this.showLoadingBar = false;
        console.log(error);
      });
  }

  getshopSections() {
    this.productPriceService.getShopSections().subscribe({
      next: res => {
        this.shopSections = res
      },
      error: error => {
        console.log(error)
      }
    })
  }

  filters: GetFiltredPrintListModel
  uploadMile() {
    this.showLoadingBar = true;
    let print = new PrintUpload(this.tokenService.getToken(), this.selectedFile, this.priceFromFile, this.tokenService.getShop(), this.tokenService.getType(), this.actionDate, this.maxPercent)
    this.productPriceService.FilterMile(print).subscribe({
      next: responce => {
        this.showFilterConteiner = true
        console.log(responce);

        this.filters = responce
      },
      error: error => {
        this.showLoadingBar = false;
        this.showFilterConteiner = false
        console.log(error);
      }
    })
  }

  checkedSectionList: string[] = []
  checkedCategoryList: string[] = [];
  //#region checkBoxMethod
  checkCategorys(formatName: string, event: any) {
    if (event.checked === true) {
      this.checkedCategoryList.push(formatName);
    }
    else {
      const index = this.checkedCategoryList.indexOf(formatName);
      if (index > -1) {
        this.checkedCategoryList.splice(index, 1);
      }
    }
  }
  checkSections(formatName: string, event: any) {
    if (event.checked === true) {
      this.checkedSectionList.push(formatName);
    }
    else {
      const index = this.checkedSectionList.indexOf(formatName);
      if (index > -1) {
        this.checkedSectionList.splice(index, 1);
      }
    }
  }
  //#endregion

  ImportExcel() {
    this.showFilterConteiner = false
    this.filters.categories = this.checkedCategoryList
    this.filters.sections = this.checkedSectionList
    this.printService.ImportFromExcel(this.filters).subscribe({
      next: responce => {
        this.dialogRef.close("true")
        this.showLoadingBar = false;
      },
      error: error => {
        console.log(error);
        this.showLoadingBar = false;
      }
    })
  }
  CancelImport() {
    this.showFilterConteiner = false
    this.printService.CancelExcel(this.filters).subscribe({
      next: result => {
        this.dialogRef.close("true");
      },
      error: error => {
        console.log(error);
        this.showLoadingBar = false;
      }
    })
  }
}