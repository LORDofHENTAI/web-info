import { Component, OnInit, Input } from '@angular/core';
import { TokenService } from 'src/app/common/services/token/token.service';
import { ProductGoods } from '../../models/product-goods';

@Component({
  selector: 'app-leavings',
  templateUrl: './leavings.component.html',
  styleUrls: ['./leavings.component.scss']
})
export class LeavingsComponent implements OnInit {

  shopId: string = '';
  @Input() data: ProductGoods[];
  displayedColumns = ['storeName', 'stock', 'reserve', 'onWay', 'supply', 'losses'];

  constructor(
    private tokenService: TokenService,
  ) {
    this.shopId = this.tokenService.getShop();
   }

  ngOnInit(): void {
  }
}