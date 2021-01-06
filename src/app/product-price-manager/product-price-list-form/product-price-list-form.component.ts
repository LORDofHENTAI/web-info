import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/common/services/snackbar/snackbar.service';
import { TokenService } from 'src/app/common/services/token/token.service';
import { ProductPriceService } from 'src/app/product-price-manager/services/product-price.service';
import { VipiskaEnd } from 'src/app/price-manager/models/vipiska-end';
import { Vipiska } from 'src/app/price-manager/models/vipiska';
import { VipiskaDelete } from 'src/app/price-manager/models/vipiska-delete';
import { VipiskaQuery } from 'src/app/price-manager/models/vipiska-query';
import { VipiskaEdit } from 'src/app/price-manager/models/vipiska-edit';
import { AddToVipiska } from 'src/app/price-manager/models/add-to-vipiska';
import { SimpleChanges } from '@angular/core';
import { PrintWindowComponent } from 'src/app/price-tags/dialog-windows/print-window/print-window.component';

@Component({
  selector: 'app-product-price-list-form',
  templateUrl: './product-price-list-form.component.html',
  styleUrls: ['./product-price-list-form.component.scss']
})
export class ProductPriceListFormComponent implements OnInit {

  @Input() article: string;

  listVipiska: VipiskaEnd;
  displayedColumnsPrint = ['name', 'quantity', 'mesname', 'price', 'summa', 'barcode'];
  imgSource = 'https://barcode.tec-it.com/barcode.ashx?data=';
  
  messageNoConnect = 'Нет соединения, попробуйте позже.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';
  
  constructor(
    public dialog: MatDialog,
    private tokenService: TokenService,
    private productPriceService: ProductPriceService,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.getListVipiska();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.article.currentValue)    
      this.addInExcerpt(changes.article.currentValue);  
  }

  getListVipiska() {
    this.productPriceService.getListVipiska(new VipiskaQuery(this.tokenService.getToken())).subscribe(response => {
      if(response) {
        this.listVipiska = response;
      }
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    }); 
  }

  addInExcerpt(article) {
    let addToVipiska = new AddToVipiska(this.tokenService.getToken(), article, this.tokenService.getShop(), '1');
    this.productPriceService.addToVipiska(addToVipiska).subscribe(response => {
      if(response.status.toLocaleLowerCase() === 'ok') {
        this.snackbarService.openSnackBar('Товар добавлен в выписку.', this.action);
        this.getListVipiska();
      }
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    }); 
  }

  onDeleteItem(vipiska: Vipiska) {
    this.productPriceService.deleteItem(new VipiskaDelete(this.tokenService.getToken(), vipiska.id)).subscribe(response => {
      if(response.status.toLocaleLowerCase() === 'ok') {
        this.snackbarService.openSnackBar('Позиция удалена.', this.action);
        this.getListVipiska();
      }
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  onEditItem(vipiska: Vipiska) {
    this.productPriceService.editItem(new VipiskaEdit(this.tokenService.getToken(), vipiska.id, '1')).subscribe(response => {
      if(response.status.toLocaleLowerCase() === 'ok') {
        this.snackbarService.openSnackBar('Количество изменено.', this.action);
        this.getListVipiska();
      }
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    }); 
  }

  onClearList() {
    this.productPriceService.clearList(new VipiskaQuery(this.tokenService.getToken())).subscribe(response => {
      if(response.status.toLocaleLowerCase() === 'ok') {
        this.snackbarService.openSnackBar('Выписка очищена.', this.action);
        this.getListVipiska();
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
      data: this.listVipiska,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
      }
    });
  }
}