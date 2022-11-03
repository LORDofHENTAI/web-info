import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenService } from 'src/app/common/services/token/token.service';
import { ProductProp } from '../../models/product-prop';
import { ProductPropAnswer } from '../../models/product-prop-answer';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  productPropAnswer: ProductPropAnswer = new ProductPropAnswer('', '', '', '', '', '', '', [], [], [], '');

  constructor(
    private tokenService: TokenService,
    private productService: ProductService,
    public dialogRef: MatDialogRef<ProductCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) { }

  ngOnInit(): void {
    this.productService.getProductProp(new ProductProp(this.tokenService.getToken(), this.data)).subscribe(response => {
      this.productPropAnswer = response;
    },
      error => {
        console.log(error);
      });
  }

  onNoClick() {
    this.dialogRef.close(false);
  }
}
