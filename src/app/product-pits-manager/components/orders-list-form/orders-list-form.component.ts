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
  @Output() selectOrderEvent = new EventEmitter<number>();
  @Output() openOrderEvent = new EventEmitter<Order>();

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
    this.selectedRow = element !== this.selectedRow ? element : new Order(0, null, 0, 0, 0, '');
    this.selectOrderEvent.emit(this.selectedRow.id);
  }

  onOpenOrder(element: Order) {
    this.openOrderEvent.emit(element);
  }
}
