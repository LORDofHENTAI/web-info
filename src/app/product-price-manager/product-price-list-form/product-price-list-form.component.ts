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

@Component({
  selector: 'app-product-price-list-form',
  templateUrl: './product-price-list-form.component.html',
  styleUrls: ['./product-price-list-form.component.scss']
})
export class ProductPriceListFormComponent implements OnInit {

  @Input() isOpen: boolean;

  selectedSize: string = 'Бейдж';
  sizes: Array<string> = ['Бейдж', 'Средний', 'Маленький',
    'А6 Альбом', 'А6 Портрет', 'А5 Портрет',
    'А5 Альбом', 'А4 Портрет', 'А4 Альбом',
    'Цветной', 'Этикетка', 'Напольный',
    'Акция', 'Акция напольный', 'Микро', 'А3'];

  listPrices: Print[];
  displayedColumnsPrint = ['name', 'quantity', 'mesname', 'price', 'summa', 'barcode'];
  imgSource = 'https://barcode.tec-it.com/barcode.ashx?data=';

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';

  constructor(
    public dialog: MatDialog,
    private tokenService: TokenService,
    private snackbarService: SnackbarService,
    private productPriceService: ProductPriceService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getListPrices();
  }


  getListPrices() {
    if (this.isOpen) {
      this.productPriceService.getListPrices(new PrintQuery(this.tokenService.getToken())).subscribe(response => {
        if (response) {
          this.listPrices = response;
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
    const dialogRef = this.dialog.open(PrintWindowComponent, {
      width: '800px',
      height: '500px',
      data: this.listPrices,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getListPrices();
      }
    });
  }

  napolSwitch() {
    this.snackbarService.openSnackBar('Преобразование выполнено', this.action, this.action);
  }

  openPrintDialog() {
    const dialogRef = this.dialog.open(PricePrintDialog);
    dialogRef.afterClosed().subscribe(result => {
      this.getListPrices();
      console.log(`${result}`);
    });
  }
}

@Component({
  selector: 'price-print-window',
  templateUrl: 'dialog-window/price-print-window.html',
  styleUrls: ['dialog-window/price-print-window.scss']
})
export class PricePrintDialog {

  type: string;
  selectedFiles?: FileList;
  selectedFileNames?: string[] = [];
  progressInfos: any[] = [];
  message: string[] = [];
  previews: string[] = [];
  imageInfos?: Observable<any>;

  form!: FormGroup;
  public datas: any;

  priceFormatList = ['none', 'А3', 'А4 верт.', 'А4 гор.', 'А5 верт.', 'А5 гор.', 'А6 верт.', 'А6 гор.'];
  priceCategoryList = ['none', 'Акция', 'Ликвидация', 'Скидка', 'Новинка', 'Товар недели', 'Черная пятница', "Акт переоценки"];
  selectedPriceFormat: string = 'none';
  selectedPriceCategory: string = 'none';
  priceFromFile = false;


  filterShow = false;

  showLoadingBar = false;

  constructor(private router: Router, private productPriceService: ProductPriceService, private tokenService: TokenService, public dialogRef: MatDialogRef<ProductPriceListFormComponent>) { }

  selectFile(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;
    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }

  uploadFiles(type: string): void {
    this.message = [];
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i], type);
      }
    }
  }

  upload(idx: number, file: File, type: string): void {
    this.progressInfos[idx] = { value: 0, filesName: file.name };
    if (file) {
      this.showLoadingBar = true;
      this.productPriceService.uploadList(new PrintUpload(this.tokenService.getToken(), file, this.priceFromFile, this.selectedPriceCategory, this.selectedPriceFormat, this.tokenService.getShop(), this.tokenService.getType()), type).subscribe(
        responce => {
          this.showLoadingBar = false;
          if (responce = "true") {
            this.dialogRef.close();
          }
        },
        error => {
          this.showLoadingBar = false;
          console.log(error);
        });
      // this.productPriceService.uploadMile(file, type, this.tokenService.getToken()).subscribe((event: any) => {
      //   if (event.type === HttpEventType.UploadProgress) {
      //     const msg = "Upload this file successfully: " + file.name;
      //     this.message.push(msg);
      //   }
      // },
      //   (err: any) => {
      //     this.progressInfos[idx].value = 0;
      //     const msg = 'Could not upload the file: ' + file.name;
      //     this.message.push(msg);
      //   });
    }
  }

}