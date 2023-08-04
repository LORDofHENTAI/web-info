import { Component, Input, OnInit } from '@angular/core';
import { TokenService } from 'src/app/common/services/token/token.service';
import { ProductPrices } from '../../models/product-prices';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})
export class PricesComponent implements OnInit {
  @Input() data: ProductPrices[];
  columns = ['storeName', 'price']
  constructor(private tokenService: TokenService) { }
  shopId: string
  ngOnInit(): void {
    this.shopId = this.tokenService.getShop()
  }

}
