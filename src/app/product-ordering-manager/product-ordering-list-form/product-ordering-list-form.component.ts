import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/common/services/snackbar/snackbar.service';
import { TokenService } from 'src/app/common/services/token/token.service';
import { ProductOrderingService } from 'src/app/product-ordering-manager/services/product-ordering.service';
import { VipiskaEnd } from 'src/app/price-manager/models/vipiska-end';
import { Vipiska } from 'src/app/price-manager/models/vipiska';
import { VipiskaDelete } from 'src/app/price-manager/models/vipiska-delete';
import { VipiskaQuery } from 'src/app/price-manager/models/vipiska-query';
import { VipiskaEdit } from 'src/app/price-manager/models/vipiska-edit';
import { SelectCountComponent } from 'src/app/price-manager/dialog-windows/select-count/select-count.component';
import { AddToVipiska } from 'src/app/price-manager/models/add-to-vipiska';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-product-ordering-list-form',
  templateUrl: './product-ordering-list-form.component.html',
  styleUrls: ['./product-ordering-list-form.component.scss']
})
export class ProductOrderingListFormComponent implements OnInit {

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
    private productOrderingService: ProductOrderingService,
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
    this.productOrderingService.getListVipiska(new VipiskaQuery(this.tokenService.getToken())).subscribe(response => {
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
    const dialogRef = this.dialog.open(SelectCountComponent, {
      width: "300px",
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        let addToVipiska = new AddToVipiska(this.tokenService.getToken(), article, this.tokenService.getShop(), result);
        this.productOrderingService.addToVipiska(addToVipiska).subscribe(response => {
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
    });
  }

  onDeleteItem(vipiska: Vipiska) {
    this.productOrderingService.deleteItem(new VipiskaDelete(this.tokenService.getToken(), vipiska.id)).subscribe(response => {
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
    const dialogRef = this.dialog.open(SelectCountComponent, {
      width: "300px",
      data: { count: vipiska.quantity },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.productOrderingService.editItem(new VipiskaEdit(this.tokenService.getToken(), vipiska.id, result)).subscribe(response => {
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
    });
  }

  onClearList() {
    this.productOrderingService.clearList(new VipiskaQuery(this.tokenService.getToken())).subscribe(response => {
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
}