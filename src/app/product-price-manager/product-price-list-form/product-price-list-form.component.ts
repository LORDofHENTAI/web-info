import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/common/services/snackbar/snackbar.service';
import { TokenService } from 'src/app/common/services/token/token.service';
import { ProductPriceService } from 'src/app/product-price-manager/services/product-price.service';
import { SimpleChanges } from '@angular/core';
import { PrintWindowComponent } from 'src/app/price-tags/dialog-windows/print-window/print-window.component';
import { Print } from '../models/print'
import { PrintQuery } from '../models/print-query';
import { AddToPrint } from '../models/add-to-print';
import { PrintDelete } from '../models/print-delete';

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
    if(this.isOpen) {
      this.productPriceService.getListPrices(new PrintQuery(this.tokenService.getToken())).subscribe(response => {
        if(response) {
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
      if(response.status.toLocaleLowerCase() === 'ok') {
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
    this.productPriceService.deleteItem(new PrintDelete(this.tokenService.getToken(), price.id)).subscribe(response => {
      if(response.status.toLocaleLowerCase() === 'ok') {
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
      if(response.status.toLocaleLowerCase() === 'ok') {
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
      if(result) {
      }
    });
  }
}