import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { SnackbarService } from 'src/app/common/services/snackbar/snackbar.service';
import { TokenService } from 'src/app/common/services/token/token.service';
import { AddOrder } from '../models/add-order';
import { DepartmentList } from '../../common/models/departmens';
import { FindOrder } from '../models/find-order';
import { Order } from '../models/order';
import { OrderStatus } from '../models/order-status';
import { PitsService } from '../services/pits.service'
import { ShopService } from 'src/app/common/services/shop/shop.service';
import { StoreList } from 'src/app/common/models/store-list';
import { ViewOrder } from '../models/view-order';
import { OrderBody } from '../models/order-body';
import { ProductAnswer } from 'src/app/product-manager/models/product-answer';
import { ProductAdd } from '../models/product-add';

@Component({
  selector: 'app-product-pits',
  templateUrl: './product-pits.component.html',
  styleUrls: ['./product-pits.component.scss']
})
export class ProductPitsComponent implements OnInit {

  @Input() productToAdd: ProductAnswer;

  listOrder: Order[] = [];
  listOrderStatus: OrderStatus[] = [];
  listDepartment: DepartmentList[] = [];
  listShop: StoreList[] = [];

  orderId: number;
  order: Order;
  orderBodyItems: OrderBody[] = []
  selectedShop: string;
  selectedStatus: OrderStatus;
  selectedDepartment: DepartmentList;
  selectedRow: any;

  isOrderOpen = false;

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';
  
  constructor(
    private datePipe: DatePipe,
    private shopService: ShopService,
    private pitsService: PitsService,
    private tokenService: TokenService,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.getOrderStatus();
    this.getDepartmentList();
    this.getShopList();
    this.getDefaultOrders();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.productToAdd)
      if(changes.productToAdd.currentValue) {
        this.addProductToOrder(this.productToAdd.article);
      }
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

  getDefaultOrders() {
    let findOrder = new FindOrder(
      this.tokenService.getToken(), 
      -1, 
      Number(this.tokenService.getDepartment()),
      Number(this.tokenService.getShop()),
      this.datePipe.transform(new Date, 'dd.MM.yyyy'), 
      this.datePipe.transform(new Date, 'dd.MM.yyyy'));
    this.getOrders(findOrder);
  }

  filterData(filter: FindOrder) {
    this.getOrders(filter);
  }

  selectOrder(orderId: number) {
    this.orderId = orderId;
  }

  openOrder(order: Order) {
    this.isOrderOpen = true;
    this.orderId = order.id;
    this.order = order;
    this.getOrder(order.id);
  }

  closeOrder(isOpen: boolean) {
    this.isOrderOpen = isOpen;
    this.orderId = 0;
  }

  addNewOrder(addOrder: AddOrder) {
    this.pitsService.addOrder(addOrder).subscribe(response => {
      if(response) {
        this.order = response;
        this.orderId = this.order.id;
        this.isOrderOpen = true;
      }
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  addProductToOrder(article: string) {
    this.pitsService.putProductToOrder(
      new ProductAdd(this.tokenService.getToken(), article, Number(this.tokenService.getShop()), this.orderId)).subscribe(response => {
      if(response) {
        this.orderBodyItems = this.orderBodyItems.concat(response);
      }
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
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

  getOrders(filter: FindOrder) {
    this.pitsService.getOrderList(filter).subscribe(response => {
      if(response) {
        this.listOrder = response;
      }
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }
}
