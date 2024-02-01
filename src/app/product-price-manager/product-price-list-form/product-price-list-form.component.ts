import { Component, HostListener, Inject, Input, OnInit } from '@angular/core';
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

  openPrintListDialogFilter() {
    const dialogRef = this.dialog.open(PricePrintWindowFiltred,
      {
        disableClose: true,
      }
    );
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

export class PricePrintDialog implements OnInit{

  priceFromFile = false;
  selectSection: boolean = false
  shopSections: ShopSection[]
  selectedSection:string
  showLoadingBar = false;
  type: string;

ngOnInit(): void {
  this.getshopSections()
}
  constructor(private router: Router,
    private productPriceService: ProductPriceService,
    private tokenService: TokenService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ProductPriceListFormComponent>,) { }

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
    this.productPriceService.uploadList(new PrintUpload(this.tokenService.getToken(), this.selectedFile, this.priceFromFile, this.selectSection, this.selectedSection, this.tokenService.getShop(), this.tokenService.getType(), this.actionDate, this.maxPercent), type).subscribe(
      responce => {
        console.log(this.selectedSection)
        this.showLoadingBar = false;
        if (type === 'mile') {
          let dialogRef = this.dialog.open(PricePrintWindowFiltred, {
            data: { responce }
          });
          dialogRef.afterClosed().subscribe(result => {
            if (result === "canceled") {
              this.dialogRef.close("canceled");
            }
            else {
              this.dialogRef.close("true");
            }
          })
        }
        else
          this.dialogRef.close("true");
      },
      error => {
        this.showLoadingBar = false;
        console.log(error);
      });
  }
  getshopSections(){
    this.productPriceService.getShopSections().subscribe({
      next: res=>{
        this.shopSections = res
      },
      error: error=>{
        console.log(error)
      }
    })
  }
}

@Component({
  selector: 'price-print-window-filtred',
  templateUrl: 'dialog-window/price-print-window-filtred.html',
  styleUrls: ['dialog-window/price-print-window.scss']
})

export class PricePrintWindowFiltred implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PricePrintWindowFiltred>,
    public printService: ProductPriceService,
    public tokenService: TokenService
  ) { }
  formatList: string[] = [];
  categoryList: string[] = [];
  checkedFormatList: string[] = [];
  checkedCategoryList: string[] = [];
  ngOnInit(): void {
    this.formatList = this.data.responce.formats;
    this.categoryList = this.data.responce.categories;
  }
  closeDialog() {
    this.dialogRef.close("canceled");
  }
  checkFormat(formatName: string, event: any, categoryName: string) {
    if (categoryName === "category") {
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
    else {
      if (event.checked === true) {
        this.checkedFormatList.push(formatName);
      }
      else {
        const index = this.checkedFormatList.indexOf(formatName);
        if (index > -1) {
          this.checkedFormatList.splice(index, 1);
        }
      }
    }

  }
  filterFunction() {
    this.printService.getFiltredPrintList(new GetFiltredPrintListModel(this.checkedCategoryList, this.checkedFormatList, this.tokenService.getToken())).subscribe(result => {
      this.dialogRef.close('true');
    }, error => {
      console.log(error);
    })
  }



}