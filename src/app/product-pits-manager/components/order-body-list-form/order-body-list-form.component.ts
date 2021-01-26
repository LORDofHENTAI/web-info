import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { TokenService } from 'src/app/common/services/token/token.service';
import { environment } from 'src/environments/environment';
import { Order } from '../../models/order';
import { OrderBody } from '../../models/order-body';

@Component({
  selector: 'app-order-body-list-form',
  templateUrl: './order-body-list-form.component.html',
  styleUrls: ['./order-body-list-form.component.scss']
})
export class OrderBodyListFormComponent implements OnInit {

  @Input() order: Order;
  @Input() isEditMode: boolean;
  @Input() deliveryDate: string;
  @Input() supplier: string;
  @Input() orderBodyItems: OrderBody[] = [];

  @Output() productDeleteEvent = new EventEmitter<number>();
  @Output() orderClearEvent = new EventEmitter<boolean>();
  
  isSalesManager: boolean = false;
  isAuthor: boolean = false;

  checkedColumn: boolean = false;
  allChecked: boolean = false;
  listCheckedItem: string[] = [];
  
  hoveredIndex: any;
  orderItems: OrderBody[];
  selectedRow: OrderBody;
  displayedColumns = ['check', 'group', 'article', 'barcode', 'name', 'supplier', 'goods', 'average', 'stockDay', 'deliveryDate', 'managerComment', 'departmentComment', 'action'];

  constructor(
    private tokenService: TokenService,
  ) { }

  ngOnInit(): void {
    this.isSalesManager = this.tokenService.getGroup().toLowerCase().includes(environment.positionHead);
    this.isAuthor = this.tokenService.getLogin().toLowerCase().includes(this.order.author);
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.orderBodyItems) {
      changes.orderBodyItems.currentValue;
    }
    if(this.isEditMode) {
      if(this.deliveryDate) {
        this.orderBodyItems.forEach(item => {
          if(item.checked)
            item.deliveryDate = this.deliveryDate;
        });
      }
      if(this.supplier) {
        this.orderBodyItems.forEach(item => {
          if(item.checked)
            item.supplier = this.supplier;
        });
      }
    }
  }

  onSelectProduct(element: OrderBody) {
    this.selectedRow = element !== this.selectedRow ? element : new OrderBody(false, 0, 0, '', '', '', '', '', '', '', '', null, '', '');
  }

  onProductDelete(element: OrderBody) {
    this.productDeleteEvent.emit(element.id);
  }

  onOrderClear() {
    this.orderClearEvent.emit(true);
  }

  selectOrder(element) { 

  }

  updateAllChecked() {
    this.someCheck();
  }

  someCheck(): boolean {
    return (this.orderBodyItems.length === this.orderBodyItems.filter(t => t.checked).length) && this.allChecked;
  }

  setAll(checked: boolean) {
    this.allChecked = true;
    this.orderBodyItems.forEach(t => t.checked = checked);
  }

  valueChange(element: OrderBody, selectedDate: string) {
    element.deliveryDate = selectedDate;
  }
}