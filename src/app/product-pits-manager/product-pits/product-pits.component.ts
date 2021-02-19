import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { SnackbarService } from 'src/app/common/services/snackbar/snackbar.service';
import { TokenService } from 'src/app/common/services/token/token.service';
import { DepartmentList } from '../../common/models/departmens';
import { Order } from '../models/order';
import { OrderStatus } from '../models/order-status';
import { PitsService } from '../services/pits.service'
import { ShopService } from 'src/app/common/services/shop/shop.service';
import { StoreList } from 'src/app/common/models/store-list';
import { OrderFormComponent } from '../components/order-form/order-form.component';

@Component({
  selector: 'app-product-pits',
  templateUrl: './product-pits.component.html',
  styleUrls: ['./product-pits.component.scss']
})
export class ProductPitsComponent implements OnInit {

  @ViewChild("orderForm", { static: false }) orderForm: OrderFormComponent;
  @Input() isOpen: boolean;

  order: Order;
  orderChanged: Order;
  isOrderOpen = false;
  listOrderStatus: OrderStatus[] = [];
  listDepartment: DepartmentList[] = [];
  listShop: StoreList[] = [];

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';
  
  constructor(
    private shopService: ShopService,
    private pitsService: PitsService,
    private tokenService: TokenService,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.getOrderStatus();
    this.getDepartmentList();
    this.getShopList();
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  getOrderStatus() {
    this.pitsService.getOrderStatus().subscribe(response => {
      if(response) {
        this.listOrderStatus = response;
      }
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  getDepartmentList() {
    this.shopService.getDepartmentList().subscribe(response => {
      if(response) {
        this.listDepartment = response;
      }
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  getShopList() {
    this.shopService.getShops().subscribe(response => {
      if(response)
        this.listShop = response;
    }, 
    error => { 
      console.log(error);
    });
  }

  openOrder(order: Order) {
    this.isOrderOpen = true;
    this.order = order;
  }

  closeOrder(isOpen: boolean) {
    this.isOrderOpen = isOpen;
  }

  orderSave(order: Order) {
    this.orderChanged = order;
  }

  addProductToOrder(article: string) {
    this.orderForm.addProductToOrder(article);
  }
}
