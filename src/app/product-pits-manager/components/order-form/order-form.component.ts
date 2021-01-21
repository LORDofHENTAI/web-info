import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { SnackbarService } from 'src/app/common/services/snackbar/snackbar.service';
import { TokenService } from 'src/app/common/services/token/token.service';
import { OrderBody } from '../../models/order-body';
import { ViewOrder } from '../../models/view-order';
import { PitsService } from '../../services/pits.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {

  @Input() orderId: number;
  @Output() closeOrderEvent = new EventEmitter<boolean>();

  listOrderBody: OrderBody[];
  document: string = '';

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

  // ngOnChanges(changes: SimpleChanges) {
  //   if(changes.orderId)
  //     if(changes.orderId.currentValue){
  //       this.getOrder(changes.orderId.currentValue);
  //     }
  // }

  onCloseClick() {
    this.closeOrderEvent.emit(false);
  }
}
