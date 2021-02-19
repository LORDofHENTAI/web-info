import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentList } from 'src/app/common/models/departmens';
import { StoreList } from 'src/app/common/models/store-list';
import { TokenService } from 'src/app/common/services/token/token.service';
import { CookieLogin } from 'src/app/login-manager/models/cookie-login';
import { AddOrder } from '../../models/add-order';
import { FindOrder } from '../../models/find-order';
import { Order } from '../../models/order';
import { OrderStatus } from '../../models/order-status';
import { PitsService } from '../../services/pits.service';

@Component({
  selector: 'app-order-filter-form',
  templateUrl: './order-filter-form.component.html',
  styleUrls: ['./order-filter-form.component.scss'],
})
export class OrderFilterFormComponent implements OnInit {

  @Input() departments: DepartmentList[];
  @Input() statuses: OrderStatus[];
  @Input() shops: StoreList[];
  @Input() orderChanged: Order;

  @Output() openOrderEvent = new EventEmitter<Order>();

  orders: Order[] = [];
  order: Order;
  isOrderOpen = false;

  findOrder: FindOrder;
  
  cookie: CookieLogin;
  filterForm: FormGroup;
  filter: FindOrder;

  dateStartAll = '2000-01-01T00:00:00.000Z';
  
  constructor(
    private datePipe: DatePipe,
    private pitsService: PitsService,
    private tokenService: TokenService,
  ) { 
    this.cookie = this.tokenService.getCookie();
    this.filterForm = new FormGroup({ 
      "status": new FormControl(-1, Validators.required),
      "shop": new FormControl(Number(this.cookie.shopId), Validators.required),
      "department": new FormControl(Number(this.cookie.departmentId), Validators.required),
      "start": new FormControl(null, Validators.required),
      "end": new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.departments.length && this.statuses.length && this.shops.length) {
      if(!this.orderChanged)
        this.getDefaultOrders();
      else {
        this.getOrders(this.findOrder);
      }
    }
  }

  getDefaultOrders() {
    this.findOrder = new FindOrder(
      this.tokenService.getToken(), 
      -1, 
      Number(this.tokenService.getDepartment()),
      Number(this.tokenService.getShop()),
      this.datePipe.transform(new Date, 'dd.MM.yyyy'), 
      this.datePipe.transform(new Date, 'dd.MM.yyyy'));
    this.getOrders(this.findOrder);
  }

  onSearch() {
    this.findOrder = new FindOrder(
      this.tokenService.getToken(), 
      this.filterForm.value.status, 
      this.filterForm.value.department, 
      this.filterForm.value.shop, 
      this.datePipe.transform(this.filterForm.value.start, 'dd.MM.yyyy'), 
      this.datePipe.transform(this.filterForm.value.end, 'dd.MM.yyyy'));
    this.getOrders(this.findOrder);
  }
  
  onTakeAll() {
    this.findOrder = new FindOrder(
      this.tokenService.getToken(), 
      this.filterForm.value.status, 
      this.filterForm.value.department, 
      this.filterForm.value.shop, 
      this.datePipe.transform(new Date(this.dateStartAll), 'dd.MM.yyyy'), 
      this.datePipe.transform(new Date(), 'dd.MM.yyyy'));
    this.getOrders(this.findOrder);
  }

  selectOrder(order: Order) {
    this.order = order;
  }

  onOpenOrder() {
    this.openOrder(this.order);
  }

  openOrder(order: Order) {
    this.order = order;
    this.openOrderEvent.emit(this.order);
  }
  
  onAddOrder() {
    let addOrder = new AddOrder(
      this.tokenService.getToken(), 
      Number(this.tokenService.getDepartment()), 
      Number(this.tokenService.getShop()));
    this.addNewOrder(addOrder);
  }

  addNewOrder(addOrder: AddOrder) {
    this.pitsService.addOrder(addOrder).subscribe(response => {
      if(response) {
        this.order = response;
        this.orders = [...this.orders, this.order];
        setTimeout( () => { 
          this.openOrderEvent.emit(this.order);
        }, 250 );
      }
    }, 
    error => { 
      console.log(error);
    });
  }

  getOrders(filter: FindOrder) {
    this.pitsService.getOrderList(filter).subscribe(response => {
      if(response) {
        this.orders = response;
      }
    }, 
    error => { 
      console.log(error);
    });
  }
}