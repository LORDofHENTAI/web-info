import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { DepartmentList } from 'src/app/common/models/departmens';
import { StoreList } from 'src/app/common/models/store-list';
import { Order } from '../../models/order';
import { OrderStatus } from '../../models/order-status';

@Component({
  selector: 'app-orders-list-form',
  templateUrl: './orders-list-form.component.html',
  styleUrls: ['./orders-list-form.component.scss']
})
export class OrdersListFormComponent implements OnInit {

  @Input() orders: Order[];
  @Input() departments: DepartmentList[];
  @Input() statuses: OrderStatus[];
  @Input() shops: StoreList[];

  @Output() selectOrderEvent = new EventEmitter<Order>();
  @Output() openOrderEvent = new EventEmitter<Order>();

  isSingleClick: Boolean = true;
  selectedRow: Order;
  displayedColumns = ['id', 'creationDate', 'statusCol', 'departmentCol', 'storeCol'];       

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.orders;
    this.departments;
    this.statuses;
    this.shops;
  }

  onSelectOrder(element: Order) {
    this.isSingleClick = true;
    setTimeout( () => {
      if(this.isSingleClick) {
        this.selectedRow = element !== this.selectedRow ? element : null; // nul / new Order(0, null, 0, 0, 0, '')
        this.selectOrderEvent.emit(this.selectedRow);           
      }
     }, 250);
  }

  onOpenOrder(element: Order) {
    this.isSingleClick = false;
    this.openOrderEvent.emit(element);
  }
}
