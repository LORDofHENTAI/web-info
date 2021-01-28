import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/common/services/snackbar/snackbar.service';
import { TokenService } from 'src/app/common/services/token/token.service';
import { environment } from 'src/environments/environment';
import { Order } from '../../models/order';
import { OrderBody } from '../../models/order-body';
import { OrderStatus } from '../../models/order-status';
import { ProductAdd } from '../../models/product-add';
import { ProductClear } from '../../models/product-clear';
import { ProductDelete } from '../../models/product-delete';
import { DatArh } from '../../models/dat-arh';
import { SaveOrderBody } from '../../models/save-order-body';
import { ViewOrder } from '../../models/view-order';
import { PitsService } from '../../services/pits.service';
import { OrderSaveFormComponent } from '../order-save-form/order-save-form.component';
import { DatImport } from '../../models/data-import';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {

  @Input() order: Order;
  @Input() productToAdd: string;
  @Input() statuses: OrderStatus[];
  
  @Output() orderSaveEvent = new EventEmitter<Order>();
  @Output() closeOrderEvent = new EventEmitter<boolean>();
  @Output() clearProductEvent = new EventEmitter<string>();

  importList: DatArh[] = [];
  deliveryDateToOrder: string;
  supplierToOrder: string;
  orderBodyItems: OrderBody[] = [];
  isEditMode = false;

  supplier: string;
  deliveryDate: Date;

  isAuthor = false;
  isSalesManager = false;
  isCanBeEdit = false;

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';

  constructor(
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private pitsService: PitsService,
    private tokenService: TokenService,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.isSalesManager = this.tokenService.getGroup().toLowerCase().includes(environment.positionHead);
    this.isAuthor = this.tokenService.getLogin().toLowerCase().includes(this.order.author);
    if(this.order.statusId === 0 && this.isAuthor)
      this.isCanBeEdit = true;
    else 
      if(this.order.statusId === 1 && this.isSalesManager)
        this.isCanBeEdit = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.order) {}
      this.getOrder(this.order.id);
    if(this.productToAdd)
      this.addProductToOrder(this.productToAdd);
  }

  onCloseClick() {
    this.closeOrderEvent.emit(false);
  }

  getOrder(orderId: number) {
    this.pitsService.getOrder(new ViewOrder(this.tokenService.getToken(), orderId)).subscribe(response => {
      if(response) {
        this.orderBodyItems = response;
      }
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  addProductToOrder(article: string) {
    if(this.isEditMode)
      this.pitsService.putProductToOrder(
        new ProductAdd(this.tokenService.getToken(), article, Number(this.tokenService.getShop()), this.order.id)).subscribe(response => {
        if(response) {
          this.orderBodyItems = this.orderBodyItems.concat(response);
          this.productToAdd = '';
          this.clearProductEvent.emit('');
        }
      }, 
      error => { 
        console.log(error);
        this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
      });
  }

  onEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  productDelete(productId: number) {
    this.pitsService.deleteProductFromOrder(new ProductDelete(this.tokenService.getToken(), productId)).subscribe(response => {
      if(response.status.toLocaleLowerCase() === 'ok') {
        this.orderBodyItems = this.orderBodyItems.filter(item => item.id !== productId);
        this.snackbarService.openSnackBar('Товар удален из заказа', this.action);
      }
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  orderClear(isOrderClear: boolean) {
    if(isOrderClear)
      this.pitsService.clearOrder(new ProductClear(this.tokenService.getToken(), this.order.id)).subscribe(response => {
        if(response.status.toLocaleLowerCase() === 'ok') {
          this.getOrder(this.order.id);
          this.snackbarService.openSnackBar('Список товаров удален', this.action);
        }
      }, 
      error => { 
        console.log(error);
        this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
      });
  }

  onOpenOrderSaveForm() {
    const dialogRef = this.dialog.open(OrderSaveFormComponent, {
      disableClose: true,
      width: "300px",
      data: { satusId: this.order.statusId, statuses: this.statuses }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.isEditMode = !this.isEditMode;
      if(result >= 0) {
        this.saveOrder(result);
      }
    });
  }

  saveOrder(statusId: number) {
    this.pitsService.saveOrder(
      new SaveOrderBody(this.tokenService.getToken(), this.order.id, this.orderBodyItems, statusId)).subscribe(response => {
      if(response) {
        this.order = response;
        this.orderSaveEvent.emit(this.order);
        this.order.statusId === statusId ? 
        this.snackbarService.openSnackBar('Заказ сохранен', this.action) :
        this.snackbarService.openSnackBar('Заказ сохранен с новым статусом', this.action);
      }
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  postFileMethod(event) {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = () => {
      let arrayStr = fileReader.result.toString().split(`\r`).filter(el => el !== '');
      arrayStr.forEach(element => {
        let item = element.split(`\n`)[1].split(`\t`);
        this.importList.push(new DatArh(item[0], item[1]));
      });
      this.importProtuctList(new DatImport(this.tokenService.getToken(), this.order.id, Number(this.tokenService.getShop()), this.importList));
    }
    fileReader.readAsText(file);
  } 

  importProtuctList(data: DatImport) {
    this.pitsService.postDataImport(data).subscribe(response => {
      if(response) {
        this.orderBodyItems = response;
        this.snackbarService.openSnackBar('Товары импортированны', this.action);
      }
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  onAddDateToOrder() {
    this.deliveryDateToOrder = this.datePipe.transform(new Date(this.deliveryDate), 'dd.MM.yyyy'); 
    setTimeout(() => {
      this.deliveryDateToOrder = ''; 
    }, 500);
  }

  onAddSupplierToOrder() {
    this.supplierToOrder = this.supplier;
    setTimeout(() => {
      this.supplierToOrder = ''; 
    }, 500);
  }

  onCloseEditMode() {
    this.isEditMode = false;
    this.getOrder(this.order.id);
  }

  onExportExcel(): void {  
  }  
}