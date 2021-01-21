import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { SnackbarService } from 'src/app/common/services/snackbar/snackbar.service';
import { TokenService } from 'src/app/common/services/token/token.service';
import { Order } from '../../models/order';
import { OrderBody } from '../../models/order-body';
import { PitsService } from '../../services/pits.service';

@Component({
  selector: 'app-order-body-list-form',
  templateUrl: './order-body-list-form.component.html',
  styleUrls: ['./order-body-list-form.component.scss']
})
export class OrderBodyListFormComponent implements OnInit {

  @Input() order: Order;
  @Input() orderBodyItems: OrderBody[] = [];
  
  hoveredIndex: any;
  orderItems: OrderBody[];
  selectedRow: OrderBody;
  displayedColumns = ['group', 'article', 'barcode', 'name', 'supplier', 'goods', 'average', 'stockDay', 'deliveryDate', 'managerComment', 'departmentComment', 'action'];

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';

  constructor(
    private pitsService: PitsService,
    private tokenService: TokenService,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.orderBodyItems) {
      changes.orderBodyItems.currentValue;
    }
  }

  onSelectProduct(element: OrderBody) {
    this.selectedRow = element !== this.selectedRow ? element : new OrderBody(0, 0, '', '', '', '', '', '', '', '', null, '', '');
  }
}
