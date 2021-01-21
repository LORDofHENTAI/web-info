import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentList } from 'src/app/common/models/departmens';
import { StoreList } from 'src/app/common/models/store-list';
import { TokenService } from 'src/app/common/services/token/token.service';
import { CookieLogin } from 'src/app/login-manager/models/cookie-login';
import { AddOrder } from '../../models/add-order';
import { FindOrder } from '../../models/find-order';
import { OrderStatus } from '../../models/order-status';

@Component({
  selector: 'app-order-filter-form',
  templateUrl: './order-filter-form.component.html',
  styleUrls: ['./order-filter-form.component.scss']
})
export class OrderFilterFormComponent implements OnInit {

  @Input() orderId: number;
  @Input() departments: DepartmentList[];
  @Input() statuses: OrderStatus[];
  @Input() shops: StoreList[];
  @Output() filterEvent = new EventEmitter<FindOrder>();
  @Output() addNewOrderEvent = new EventEmitter<AddOrder>();
  @Output() openOrderEvent = new EventEmitter<number>();
  
  cookie: CookieLogin;
  filterForm: FormGroup;
  filter: FindOrder;

  dateStartAll = '2000-01-01T00:00:00.000Z';
  
  constructor(
    private datePipe: DatePipe,
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
  }

  onSearch() {
    let findOrder = new FindOrder(
      this.tokenService.getToken(), 
      this.filterForm.value.status, 
      this.filterForm.value.department, 
      this.filterForm.value.shop, 
      this.datePipe.transform(this.filterForm.value.start, 'dd.MM.yyyy'), 
      this.datePipe.transform(this.filterForm.value.end, 'dd.MM.yyyy'));
    this.filterEvent.emit(findOrder);
  }
  
  onTakeAll() {
    let findOrder = new FindOrder(
      this.tokenService.getToken(), 
      this.filterForm.value.status, 
      this.filterForm.value.department, 
      this.filterForm.value.shop, 
      this.datePipe.transform(new Date(this.dateStartAll), 'dd.MM.yyyy'), 
      this.datePipe.transform(new Date(), 'dd.MM.yyyy'));
    this.filterEvent.emit(findOrder);
  }
  
  onAddOrder() {
    let addOrder = new AddOrder(
      this.tokenService.getToken(), 
      Number(this.tokenService.getDepartment()), 
      Number(this.tokenService.getShop()));
    this.addNewOrderEvent.emit(addOrder);
  }

  onOpenOrder() {
    this.openOrderEvent.emit(this.orderId);
  }
}
