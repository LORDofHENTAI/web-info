import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
import { CookieLogin } from 'src/app/login-manager/models/cookie-login';

@Component({
  selector: 'app-product-pits',
  templateUrl: './product-pits.component.html',
  styleUrls: ['./product-pits.component.scss']
})
export class ProductPitsComponent implements OnInit {

  cookie: CookieLogin;
  listOrder: Order[] = [];
  listOrderStatus: OrderStatus[] = [];
  listDepartment: DepartmentList[] = [];
  listShop: StoreList[] = [];

  selectedShop: string;
  selectedStatus: OrderStatus;
  selectedDepartment: DepartmentList;
  selectedRow: any;

  displayedColumns = ['id', 'creationDate', 'statusId', 'deparmentId', 'storeId'];       

  filterForm: FormGroup;
  // range = new FormGroup({
  //   start: new FormControl('', Validators.required),
  //   end: new FormControl('', Validators.required)
  // });

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';
  
  constructor(
    private datePipe: DatePipe,
    private shopService: ShopService,
    private pitsService: PitsService,
    private tokenService: TokenService,
    private snackbarService: SnackbarService,
  ) {
    this.cookie = this.tokenService.getCookie();
    this.filterForm = new FormGroup({ 
      "status": new FormControl(-1, Validators.required),
      "shop": new FormControl(Number(this.cookie.shopId), Validators.required),
      "department": new FormControl(Number(this.cookie.departmentId), Validators.required),
      "start": new FormControl('', Validators.required),
      "end": new FormControl('', Validators.required)
    });
   }

  ngOnInit(): void {
    this.getOrderStatus();
    this.getDepartmentList();
    this.getOrderList();
    this.getShopList();
  }

  onSelectRowClick() {
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

  getOrderList() {
    let start = this.datePipe.transform(new Date, 'dd.MM.yyyy');
    let end = this.datePipe.transform(new Date, 'dd.MM.yyyy');
    let findOrder = new FindOrder(this.tokenService.getToken(), this.filterForm.value.status, this.filterForm.value.department, this.filterForm.value.shop, start, end);
    this.pitsService.getOrderList(findOrder).subscribe(response => {
      if(response) {
        this.listOrder = response;
      }
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  onSearch() {
    let start = this.datePipe.transform(this.filterForm.value.start, 'dd.MM.yyyy');
    let end = this.datePipe.transform(this.filterForm.value.end, 'dd.MM.yyyy');
    let findOrder = new FindOrder(
      this.tokenService.getToken(), this.filterForm.value.status, this.filterForm.value.department, this.filterForm.value.shop, start, end);
    this.pitsService.getOrderList(findOrder).subscribe(response => {
      if(response) {
        this.listOrder = response;
      }
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  onAddOrder() {
    let addOrder = new AddOrder(this.tokenService.getToken(), Number(this.tokenService.getDepartment()), Number(this.tokenService.getShop()));
    this.pitsService.addOrder(addOrder).subscribe(response => {
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
