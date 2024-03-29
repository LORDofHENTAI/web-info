import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/common/services/snackbar/snackbar.service';
import { TokenService } from 'src/app/common/services/token/token.service';
import { SelectCountComponent } from 'src/app/product-ordering-manager/dialog-windows/select-count/select-count.component';
import { AddToVipiska } from 'src/app/product-ordering-manager/models/add-to-vipiska';
import { ProductOrderingService } from 'src/app/product-ordering-manager/services/product-ordering.service';
import { ProductAnswer } from '../../models/product-answer';
import { ProductProp } from '../../models/product-prop';
import { ProductPropAnswer } from '../../models/product-prop-answer';
import { ProductService } from '../../services/product.service';
import { AddToPrint } from 'src/app/product-price-manager/models/add-to-print';
import { ProductPriceService } from 'src/app/product-price-manager/services/product-price.service';

@Component({
  selector: 'app-price-checker',
  templateUrl: './price-checker.component.html',
  styleUrls: ['./price-checker.component.scss']
})
export class PriceCheckerComponent implements OnInit {

  article: string = ''
  shopId: string;
  productPropAnswer: ProductPropAnswer = new ProductPropAnswer('', '', '', '', '', '', '', [], [], [], [], '');
  displayedColumns = ['storeName', 'stock', 'reserve', 'onWay', 'supply', 'losses'];
  displayedColumnsBarcodes = ['barcodes'];
  addToVipiska: AddToVipiska;

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';

  constructor(
    public dialog: MatDialog,
    private tokenService: TokenService,
    private productService: ProductService,
    private snackbarService: SnackbarService,
    private productOrderingService: ProductOrderingService,
    public dialogRef: MatDialogRef<PriceCheckerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductAnswer,
    public productPriceService: ProductPriceService
  ) {
    this.shopId = this.tokenService.getShop();
  }

  ngOnInit(): void {
    this.getProductProp();
  }

  getProductProp(): void {
    this.productService.getProductProp(new ProductProp(this.tokenService.getToken(), this.data.article)).subscribe(response => {
      this.productPropAnswer = response;
    },
      error => {
        console.log(error);
      });
  }

  addInExcerpt(article: string) {
    const dialogRef = this.dialog.open(SelectCountComponent, {
      width: "400px",
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.addToVipiska = new AddToVipiska(this.tokenService.getToken(), article, this.tokenService.getShop(), this.tokenService.getType(), String(result));
        this.productOrderingService.addToVipiska(this.addToVipiska).subscribe(response => {
          if (response = 'OK') {
            this.snackbarService.openSnackBar('Товар добавлен в выписку.', this.action);
            this.article = article;
            this.onNoClick('order');
          }
        },
          error => {
            console.log(error);
            this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
          });
      }
    });
  }
  addInList(article: string) {
    let addToPrint = new AddToPrint(this.tokenService.getToken(), article, this.tokenService.getShop(), this.tokenService.getType());
    this.productPriceService.addPrice(addToPrint).subscribe(response => {
      if (response = 'true') {
        this.snackbarService.openSnackBar('Товар добавлен в список ценников.', this.action);
        this.article = article;
        this.onNoClick('print');
      }
    },
      error => {
        console.log(error);
        this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
      });
  }

  onNoClick(type: string) {
    this.dialogRef.close(type);
  }
} 